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
 // config: String = '{leftTime: 1200, notify: [30, 60, 120, 300, 600, 900, 1180; 1199], demand: true}';
  quote: string;
  timer = 1200;
  isLoading: boolean;
  showInbox = false;
  emailReminder = 0;
  testCompleted = false;
  testRecord = false;
  anrufAnzeigen = false;
  private stream: MediaStream;
  private recordRTC: any;
  bewerber: Bewerber;
  selectedPruefung: Pruefung;
  pruefungen: Pruefung[] = [];
  verbleibendeZeit: number;
  anrufer: String = '';

  constructor(private pruefungsService: PruefungService, private ergebnisService: ErgebnisService, private bewerberService: BewerberService, private authenticationService: AuthenticationService, private quoteService: QuoteService, private notificationsService: NotificationsService) { }

  ngAfterViewInit() {
    // set the initial state of the video
    let video : HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
  }

  returnConfig() {
    if (this.selectedPruefung) {
      return '{leftTime: 12000, notify: [30, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1180, 1199], demand: true}';
    }
    else {
      return '{leftTime: 12000, notify: [30, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840, 900, 960, 1020, 1080, 1140, 1180, 1199], demand: true}';
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

  startTestaufnahme() {
    this.testRecord = true;
    this.startRecording();
  }

  stopTestaufnahme() {
    this.testRecord = false;
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }



  stopRecording() {
    let recordRTC = this.recordRTC;
    recordRTC.stopRecording(this.processVideo.bind(this));
    let stream = this.stream;
    stream.getAudioTracks().forEach(track => track.stop());
    stream.getVideoTracks().forEach(track => track.stop());
  }

  download() {
    this.recordRTC.save('video.webm');
  }

  save() {
    this.recordRTC.getBlob();    
    setTimeout( () => {
      this.recordRTC.getDataURL(dataURL => {
        this.selectedPruefung.ergebnis.videoPfad = dataURL;
        this.pruefungsService.updatePruefung(this.selectedPruefung).subscribe( p2 => {
        });
      });
    }, 1000);
  
  }


beendePruefung() {
  this.stopRecording();

  this.pruefungsService.getPruefungById(this.selectedPruefung.id).subscribe( p => {
    this.selectedPruefung = p;
    this.selectedPruefung.status = 'bearbeitet';
    this.selectedPruefung.ergebnis.verbleibendeZeit = this.verbleibendeZeit;
 // timer Zeit einfügen 
    this.save();

  });
}

  startTimer() {
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

  callIncome(anrufer) {
    this.anrufAnzeigen = true;
    this.anrufer = anrufer;
  }

  notified(event: any) {
    let time = event / 1000;
    this.verbleibendeZeit = time;
    if (time % 60 === 0) {
      this.emailReminder = 20 - time / 60;
    }
    switch (time) {
      case 1180: if (this.selectedPruefung.test.anrufe[0]) {
        this.callIncome(this.selectedPruefung.test.anrufe[0]);
        } break;
      case 1060: if (this.selectedPruefung.test.anrufe[1]) {
        this.callIncome(this.selectedPruefung.test.anrufe[1]);
        } break;
      case 900: this.reminderForLeftTime('15 Minuten'); break;
      case 800: if (this.selectedPruefung.test.anrufe[2]) {
        this.callIncome(this.selectedPruefung.test.anrufe[2]);
        } break;
      case 600: this.reminderForLeftTime('10 Minuten'); break;
      case 700: if (this.selectedPruefung.test.anrufe[3]) {
        this.callIncome(this.selectedPruefung.test.anrufe[3]);
        } break;
      case 500: if (this.selectedPruefung.test.anrufe[4]) {
        this.callIncome(this.selectedPruefung.test.anrufe[4]);
        } break;
      case 300: this.reminderForLeftTime('5 Minuten'); break;
      case 250: if (this.selectedPruefung.test.anrufe[5]) {
        this.callIncome(this.selectedPruefung.test.anrufe[5]);
        } break;
      case 120: this.reminderForLeftTime('2 Minuten'); break;
      case 60: this.reminderForLeftTime('1 Minute'); break;
      case 30: this.reminderForLeftTime('30 Sekunden'); break;
    }

  }
  onTimerStarted() {
    this.startRecording();
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
    this.isLoading = true;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; });


    this.bewerberService.getBewerberByBenutzername(this.authenticationService.credentials.username).subscribe( b => {
      this.bewerber = b;
      let pruefungen: Pruefung[] = [];
      if (this.bewerber.pruefungen !== undefined ) {
        this.bewerber.pruefungen.forEach( p => {
          if (p.status === 'offen') {
            pruefungen.push(p);
          }
        });
      }
      this.pruefungen = pruefungen;
    });


  }


}


