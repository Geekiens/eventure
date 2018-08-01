import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CountdownComponent } from 'ngx-countdown';
import { NotificationsService } from 'angular2-notifications';
import * as RecordRTC from 'recordrtc';
import { QuoteService } from '@app/home/quote.service';

import { BewerberService, Bewerber } from '@app/core/services/bewerber.service';
import { PruefungService, Pruefung } from '@app/core/services/pruefung.service';
import { ErgebnisService, Ergebnis } from '@app/core/services/ergebnis.service';

import { AuthenticationService } from '@app/core/authentication/authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(CountdownComponent) counter: CountdownComponent;
  @ViewChild('video') video: any;
  config: String = '{leftTime: 1200, notify: [30, 60, 120, 300, 600, 900, 1199], demand: true}';
  quote: string;
  timer = 1200;
  isLoading: boolean;
  showInbox = false;
  testCompleted = false;
  testRecord = false;
  anrufAnzeigen = true;
  private stream: MediaStream;
  private recordRTC: any;
  bewerber: Bewerber;
  selectedPruefung: Pruefung;
  pruefungen: Pruefung[] = [];
  verbleibendeZeit: number;

  constructor(private pruefungsService: PruefungService, private ergebnisService: ErgebnisService, private bewerberService: BewerberService, private authenticationService: AuthenticationService, private quoteService: QuoteService, private notificationsService: NotificationsService) { }

  ngAfterViewInit() {
    // set the initial state of the video
    let video : HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  returnConfig() {
    console.log('test');
    if (this.selectedPruefung) {
      //return '{leftTime: ' +  this.selectedPruefung.test.zeit + ', notify: [30, 60, 120, 300, 600, 900, 1199], demand: true}'
      return '{leftTime: 12000, notify: [30, 60, 120, 300, 600, 900, 1199], demand: true}';

    }
    else {
      return '{leftTime: 12000, notify: [30, 60, 120, 300, 600, 900, 1199], demand: true}';
    }
  }

  toggleControls() {
    let video: HTMLVideoElement = this.video.nativeElement;
    video.muted = !video.muted;
    video.controls = !video.controls;
    video.autoplay = !video.autoplay;
  }

  successCallback(stream: MediaStream) {

    var options = {
      mimeType: 'video/webm', // or video/webm\;codecs=h264 or video/webm\;codecs=vp9
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 128000,
      bitsPerSecond: 128000 // if this line is provided, skip above two
    };
    this.stream = stream;
    this.recordRTC = RecordRTC(stream, options);
    this.recordRTC.startRecording();
    let video: HTMLVideoElement = this.video.nativeElement;
    video.src = window.URL.createObjectURL(stream);




    this.toggleControls();
  }

  errorCallback() {
    //handle error here
  }

  processVideo(audioVideoWebMURL) {
    let video: HTMLVideoElement = this.video.nativeElement;
    let recordRTC = this.recordRTC;
    video.src = audioVideoWebMURL;
    this.toggleControls();
    let recordedBlob = recordRTC.getBlob();
    recordRTC.getDataURL(function (dataURL) { });
  }

  startRecording() {
    this.testRecord = true;
    const mediaConstraints: any = {

      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720}
      }, audio: true
    };
    
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));

      
      
  }



  stopRecording() {
    this.testRecord = false;
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save('video.webm');
  }


beendePruefung() {
  this.pruefungsService.getPruefungById(this.selectedPruefung.id).subscribe( p => {
    this.selectedPruefung = p;
    this.selectedPruefung.status = 'bearbeitet';
    this.selectedPruefung.ergebnis.verbleibendeZeit = this.verbleibendeZeit; // timer Zeit einfügen 
    this.pruefungsService.updatePruefung(this.selectedPruefung).subscribe( p2 => {
      console.log('test');
    });
  });

}


  startTimer() {
    console.log(this.selectedPruefung);
    this.counter.begin();
    this.showInbox = true;
  }



  reminderForLeftTime(timeLeft: string) {
    this.notificationsService.info('Sie haben noch', timeLeft, {
      timeOut: 7000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  stopTest() {
    this.showInbox = false;
    this.testCompleted = true;
    this.counter.stop();
    this.beendePruefung();

  }

  callIncome() {
    this.anrufAnzeigen = true;
  }

  notified(event: any) {
    console.log(event / 1000 );
    const time = event / 1000;
    this.verbleibendeZeit = time;

    switch (time) {
      case 1190: 
      case 900: this.reminderForLeftTime('15 Minuten'); break;
      case 600: this.reminderForLeftTime('10 Minuten'); break;
      case 300: this.reminderForLeftTime('5 Minuten'); break;
      case 120: this.reminderForLeftTime('2 Minuten'); break;
      case 60: this.reminderForLeftTime('1 Minute'); break;
      case 30: this.reminderForLeftTime('30 Sekunden'); break;
    }
  }
  onTimerStarted() {
    this.notificationsService.info('Viel Erfolg!', 'Sie haben 20 Minuten Zeit', {
      timeOut: 10000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }
  onFinished() {
    this.testCompleted = true;
    this.showInbox = false;
    this.notificationsService.success('Test beendet', 'Sie erhalten in kürze ihr Feedback', {
      timeOut: 10000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  ngOnInit() {
    this.bewerberService.getBewerberByBenutzername(this.authenticationService.credentials.username).subscribe( b => {
      this.bewerber = b;
      let pruefungen: Pruefung[] = [];
      this.bewerber.pruefungen.forEach( p => {
        if (p.status === 'offen') {
          pruefungen.push(p);
        }
      });
      this.pruefungen = pruefungen;
    });

    this.isLoading = true;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; });
  }


}


