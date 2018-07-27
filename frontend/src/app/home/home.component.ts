import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CountdownComponent } from 'ngx-countdown';
import { NotificationsService } from 'angular2-notifications';
import * as RecordRTC from 'recordrtc';
import { QuoteService } from '@app/home/quote.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(CountdownComponent) counter: CountdownComponent;
  @ViewChild('video') video: any;

  quote: string;
  isLoading: boolean;
  showInbox = false;
  testCompleted = false;
  testRecord = false;
  anrufAnzeigen = true;
  private stream: MediaStream;
  private recordRTC: any;

  constructor(private quoteService: QuoteService, private notificationsService: NotificationsService) { }

  ngAfterViewInit() {
    // set the initial state of the video
    let video : HTMLVideoElement = this.video.nativeElement;
    video.muted = false;
    video.controls = true;
    video.autoplay = false;
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
  }

  callIncome() {
    this.anrufAnzeigen = true;
  }

  notified(event: any) {
    console.log(event / 1000 );
    const time = event / 1000;
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
    this.isLoading = true;
    this.quoteService.getRandomQuote({ category: 'dev' })
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((quote: string) => { this.quote = quote; });
  }


}

export interface Email {
  absender: string;
  titel: string;
  text?: string;
  absendeDatum: string;
  priortaet?: string;
  ersccheintDirekt: boolean;
  erscheintNachMS?: number;
}

