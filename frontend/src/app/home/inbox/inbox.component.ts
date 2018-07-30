import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

import { SelectDateDialogComponent } from '@app/home/inbox/selectDateDialog/selectDateDialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PruefungService, Pruefung } from '@app/core/services/pruefung.service';
import { ErgebnisService, Ergebnis, BewerberReaktion, Kalendereintrag } from '@app/core/services/ergebnis.service';

import { Email, Antwort } from '@app/core/services/email.service';
import { element } from '../../../../node_modules/protractor';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  showMailText = false;
  antwortText = '';
  @Input() anrufAnzeigen: boolean;
  @Input() pruefung: Pruefung;
  beantworteteEmails: Email [] = [];
  emails: Email[];
  selectedEmail: Email = null;
  kalendereintrag: Kalendereintrag;
  hasAnswers = false;
  displayedMails: Email[];
  eingang = true;
  showAnswer = false;
  ergebnis: Ergebnis = {videoPfad: 'Dummy'};
  bewerberReaktion: BewerberReaktion = null;
  weiterleiten = false;
  weiterleitenPersonen: String[] = ['Softwarearchitekt', 'Studentischer Entwickler', 'Direkter Vorgesetzter', 'Personalabteilung', 'Kunde', 'Projektleiter'];
  selectedPerson: String;
  anrufer = 'Chuck';
  //showAnruf = false;

  constructor(private ergebnisService: ErgebnisService, private notificationsService: NotificationsService, public dialog: MatDialog) { }

  acceptCall() {
    const audio = new Audio();
    audio.src = '../../../../assets/' + this.anrufer + '.mp3';
    audio.load();
    audio.play();
  }
  
  declineCall() {
    this.anrufAnzeigen = false;
  }

  emailClicked(email: Email) {
    this.weiterleiten = false;
    this.showAnswer = false;
    this.selectedEmail = email;
    this.showMailText = true;
    this.hasAnswers = this.selectedEmail.antworten.length > 0;
  }
  antwortenClicked() {
    this.showAnswer = !this.showAnswer;
  }

  openCalendar() {
    let dialogRef = this.dialog.open(SelectDateDialogComponent, {
      width: '50vw',
      data: {  }
    });
  }

  weiterleitenClicked() {
    this.weiterleiten = !this.weiterleiten;
  }

  aufTerminClicked() {
    let dialogRef = this.dialog.open(SelectDateDialogComponent, {
      data: {ergebnis: this.ergebnis, titel: this.selectedEmail.titel }, width: '50vw'
    });
  }


  sendMail() {
  this.bewerberReaktion = {
    reaktionsArt: 'antwort',
    email: this.selectedEmail,
    text: this.antwortText
  };
  if (this.ergebnis.bewerberReaktionen) {
    this.ergebnis.bewerberReaktionen.push(this.bewerberReaktion);
  }
  else {
    this.ergebnis.bewerberReaktionen = [];
    this.ergebnis.bewerberReaktionen.push(this.bewerberReaktion);
  }
  this.ergebnisService.updateErgebnis(this.ergebnis).subscribe(e => {
    this.ergebnis = e;
  });
  this.beantworteteEmails.push(this.selectedEmail);

  this.emails.forEach(element => {
    let index = this.emails.indexOf(element);
    this.emails.splice(index, 1);
  });
}

showEingang() {
  this.displayedMails = this.emails;
}
showAusgang() {
  let mails: Email[] = [];
  this.ergebnis.bewerberReaktionen.forEach( reakt => {
    if (reakt.reaktionsArt === 'option' || reakt.reaktionsArt === 'antwort') {
      mails.push(reakt.email);
    }
  });
  this.displayedMails = mails;
}

  mailWeiterleiten() {
    this.bewerberReaktion = {
      reaktionsArt: 'weiterleiten',
      email: this.selectedEmail,
      text: this.selectedPerson
    };
    if (this.ergebnis.bewerberReaktionen) {
      this.ergebnis.bewerberReaktionen.push(this.bewerberReaktion);
    }
    else {
      this.ergebnis.bewerberReaktionen = [];
      this.ergebnis.bewerberReaktionen.push(this.bewerberReaktion);
    }
    this.ergebnisService.updateErgebnis(this.ergebnis).subscribe(e => {
      this.ergebnis = e;
    });

  }

  sendOption(i) {
    this.bewerberReaktion = {
      reaktionsArt: 'option',
      email: this.selectedEmail,
      text: i
    };
    if (this.ergebnis.bewerberReaktionen) {
      this.ergebnis.bewerberReaktionen.push(this.bewerberReaktion);
    }
    else {
      this.ergebnis.bewerberReaktionen = [];
      this.ergebnis.bewerberReaktionen.push(this.bewerberReaktion);
    }
    this.ergebnisService.updateErgebnis(this.ergebnis).subscribe(e => {
      this.ergebnis = e;
    });
    this.beantworteteEmails.push(this.selectedEmail);

    this.emails.forEach(element => {
      let index = this.emails.indexOf(element);
      this.emails.splice(index, 1);
    });
  }
 
  ngOnInit() {
    
    this.ergebnisService.createErgebnis(this.ergebnis).subscribe(e => {
      this.ergebnis = e;
    });

    this.displayedMails = this.emails = this.pruefung.test.emails;
  }

}




