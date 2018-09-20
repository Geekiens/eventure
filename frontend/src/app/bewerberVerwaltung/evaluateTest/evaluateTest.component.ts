import { Component, OnInit, ViewChild } from "@angular/core";
import { finalize } from "rxjs/operators";
import { assertTSExpressionWithTypeArguments } from "babel-types";
import { ActivatedRoute, Router } from "@angular/router";
import { PruefungService, Pruefung, BewerberReaktion, Kalendereintrag } from '@app/core/services/pruefung.service';
import { TestService, Test } from '@app/core/services/test.service';

import { _MatSortHeaderMixinBase } from "@angular/material";
import { NotificationsService } from 'angular2-notifications';



@Component({
  selector: "app-evaluate-test",
  templateUrl: "./evaluateTest.component.html",
  styleUrls: ["./evaluateTest.component.scss"]
})
export class EvaluateTestComponent implements OnInit {
  @ViewChild('video') video: any;
  playVideo = false;
  reaktionen: BewerberReaktion[] = [];
  bewertung: number[] = [0, 0, 0, 0, 0, 0];
  emailPunkte: number[] = [0, 0, 0, 0, 0, 0]; // für eine Mail
  weiterleitenPunkte: number[] = [0, 0, 0, 0, 0, 0]; // für eine Mail
  maxPunkte: number[] = [5, 10, 2, 2, 2, 3];
  kalenderMaxPunkte: number[] = [10, 10, 10, 10, 50, 10];
  kalenderPunkte: number[] = [0, 0, 0, 0, 0, 0];

  anrufenMaxPunkte: number[] = [10, 10, 10, 10, 50, 10];
  anrufenPunkte: number[] = [0, 0, 0, 0, 0, 0];

  videoPunkte: number[] = [0, 0, 0, 0, 0, 0];
  videoMaxPunkte: number[] = [25, 25, 25, 25, 25, 25];
  reaktion: BewerberReaktion;
  antwort: BewerberReaktion;
  pruefung: Pruefung;
  index = 0;
  allEmailsEvaluated = false;
  allWeitergeleitetEvaluated = false;
  id: string;
  antworten: BewerberReaktion[] = [];
  weitergeleiteteMails: BewerberReaktion[] = [];
  weitergeleiteteMail: BewerberReaktion;
  autoPunkte: number[] = [0, 0, 0, 0, 0, 0];
  loeschenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  optionPunkte: number[] = [0, 0, 0, 0, 0, 0];
  ergebnisBerechnet = false;



  punkteAntworten: number[] = [0, 0, 0, 0, 0, 0]; // aggregiert
  punkteWeiterleiten: number[] = [0, 0, 0, 0, 0, 0];
  punkteSumme: number[] = [0, 0, 0, 0, 0, 0];

  tag1: Kalendereintrag[] = [];
  tag2: Kalendereintrag[] = [];
  tag3: Kalendereintrag[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private pruefungService: PruefungService, private testService: TestService) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.pruefungService.getPruefungById(this.id).subscribe(p => {
        this.pruefung = p;
        console.log(this.pruefung);

        this.pruefung.ergebnis.bewerberReaktionen.forEach(reakt => {
          if (reakt.reaktionsArt === 'antwort') {
            this.antworten.push(reakt);
          } else {
            if (reakt.reaktionsArt === 'loeschen') {
              for (let index = 0; index <= 5; index++) {
                this.loeschenPunkte[index] += reakt.email.loeschenPunkte[index];
                this.autoPunkte[index] += reakt.email.loeschenPunkte[index];
              }
            }
            if (reakt.reaktionsArt === 'option') {
              for (let index1 = 0; index1 <= 5; index1++) {
                this.optionPunkte[index1] += reakt.email.antworten[Number(reakt.text)].punkte[index1];
                this.autoPunkte[index1] += reakt.email.antworten[Number(reakt.text)].punkte[index1];
              }
            }
            if (reakt.reaktionsArt === 'weiterleiten') {
                this.weitergeleiteteMails.push(reakt);
            }
          }
        });
        this.weitergeleiteteMail = this.weitergeleiteteMails[0];
        this.antwort = this.antworten[0];
        console.log(this.antwort);
        this.pruefung.ergebnis.kalendereintraege.forEach(k => {
          switch (k.tag) {
            case '1':
                this.tag1.push(k);
              break;
            case '2':
                this.tag2.push(k);
              break;
            case '3':
                this.tag3.push(k);
              break;
          }
        });
        this.tag1 = this.sortiere(this.tag1);
        this.tag2 = this.sortiere(this.tag2);
        this.tag3 = this.sortiere(this.tag3);
        this.processVideo();
      });
    });
  }



  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  processVideo() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = String(this.pruefung.ergebnis.videoPfad);
    this.video.src = String(this.pruefung.ergebnis.videoPfad);
    //video.= 'video/webm';
    //let recordRTC = this.recordRTC;
    //video.src = audioVideoWebMURL;
    //this.toggleControls();
    video.muted = false;
    video.controls = true;
    video.autoplay = true;
    this.playVideo = true;
    //let recordedBlob = recordRTC.getBlob();
    //recordRTC.getDataURL(function (dataURL) { });
  }




















  nextMail() {
    for (let index = 0; index <= 5; index++) {
      this.punkteAntworten[index] += this.emailPunkte[index];
    }
    if (!this.allEmailsEvaluated) {
      this.index++;
      if (this.index <= this.antworten.length - 1) {
        this.antwort = this.antworten[this.index];
      } else {
        this.allEmailsEvaluated = true;
      }
    }
  }
  back() {
    this.router.navigate(['bewerberVerwaltung/ergebnis']);
  }

  berechneErgebnis() {
    this.ergebnisBerechnet = true;
    for (let index = 0; index <= 5; index++) {
      this.punkteSumme[index] = Number(this.punkteWeiterleiten[index]) + Number(this.punkteAntworten[index]) + Number(this.videoPunkte[index]) +
                                Number(this.loeschenPunkte[index]) + Number(this.kalenderPunkte[index]) + Number(this.optionPunkte[index]) +
                                Number(this.anrufenPunkte[index]);
                              }
    this.pruefung.ergebnis.punkteAnrufer = this.anrufenPunkte;
    this.pruefung.ergebnis.punkteSumme = this.punkteSumme;
    this.pruefung.ergebnis.punkteKalender = this.kalenderPunkte;
    this.pruefung.ergebnis.punkteVideo = this.videoPunkte;
    this.pruefung.status = 'abgeschlossen';
    console.log(this.pruefung);
    let p: Pruefung = this.pruefung;
    this.pruefungService.updatePruefungSub(this.pruefung);
    for (let i = 0; i < 6; i++) {
      if (this.pruefung.test.durchschnitt  !== null) {
      this.pruefung.test.durchschnitt[i] = (this.pruefung.test.durchfuehrungen * this.pruefung.test.durchschnitt[i] +
                                          this.pruefung.ergebnis.punkteSumme[i]) / (this.pruefung.test.durchfuehrungen + 1);
      } else {

        this.pruefung.test.durchschnitt = this.pruefung.ergebnis.punkteSumme;
      }

    }
    this.pruefung.test.durchfuehrungen ++;
    this.testService.updateTest(this.pruefung.test);


    this.router.navigate(['bewerberVerwaltung/ergebnis'], {queryParams: {id: p.id }});

  }
  nextWeitergeleitet() {
    for (let index = 0; index <= 5; index++) {
      this.punkteWeiterleiten[index] += this.weiterleitenPunkte[index];
    }
    if (!this.allWeitergeleitetEvaluated) {
      this.index++;
      if (this.index <= this.weitergeleiteteMails.length - 1) {
        this.weitergeleiteteMail = this.weitergeleiteteMails[this.index];
      } else {
        this.allWeitergeleitetEvaluated = true;
        console.log('Alle Weitergeleiteten fertig');
      }
    }
  }

  nullenErgaenzen (minute: String) {
    if (minute === '0') {
      return '00';
    }
    else {
      return minute;
    }
  }

  runden(zeit) {
    return Math.round(zeit);
  }

  sortiere(arr: Kalendereintrag[]) {
    let retArr: Kalendereintrag[] = [];
    while (arr.length > 0) {
      let earliest: Kalendereintrag = arr[0];
      arr.forEach( t => {
        if (Number(t.start) < Number(earliest.start) || (Number(t.start) === Number(earliest.start) && Number(t.startMinuten) < Number(earliest.startMinuten)) ) {
          earliest = t;
        }
      });
      retArr.push(earliest);
      arr.splice(arr.indexOf(earliest), 1);
    }
    return retArr;
  }
  ngOnInit() {
   // this.processVideo();

  }
}

export interface Email {
  absender: string;
  titel: string;
  text?: string;
  absendeDatum: string;
}
