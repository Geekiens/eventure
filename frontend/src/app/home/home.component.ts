import { Component, OnInit, ViewChild } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CountdownComponent } from 'ngx-countdown';
import { NotificationsService } from 'angular2-notifications';


import { QuoteService } from './quote.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(CountdownComponent) counter: CountdownComponent;

  quote: string;
  isLoading: boolean;
  showInbox = false;
  testCompleted = false;

  constructor(private quoteService: QuoteService, private notificationsService: NotificationsService) { }

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

  notified(event: any) {
    console.log(event / 1000 );
    const time = event / 1000;
    switch (time) {
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

