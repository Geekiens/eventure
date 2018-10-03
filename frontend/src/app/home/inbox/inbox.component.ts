import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

import { SelectDateDialogComponent } from '@app/home/inbox/selectDateDialog/selectDateDialog.component';
import { ConfirmationDialogComponent } from '@app/home/inbox/confirmationDialog/confirmationDialog.component';
import { ContextDialogComponent } from '@app/home/inbox/contextDialog/contextDialog.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PruefungService, Pruefung } from '@app/core/services/pruefung.service';
import { ErgebnisService, Ergebnis, BewerberReaktion, Kalendereintrag } from '@app/core/services/ergebnis.service';

import { Email, Antwort } from '@app/core/services/email.service';
import { element } from 'protractor';
import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';



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
  @Input() anrufer = 'Chuck';
  @Input()
  public set emailReminder(val: number) {
    this.emailsNachStart.forEach( e => {
      if (e.erscheintNachMS === val) {
        this.displayedMails.unshift(e);
      }
    });
  }
  @Output() resetAnrufAnzeigen = new EventEmitter();

  beantworteteEmails: Email [] = [];
  emails: Email[];
  selectedEmail: Email = null;
  kalendereintrag: Kalendereintrag;
  hasAnswers = false;
  geloeschteMails: Email[] = [];
  displayedMails: Email[];
  weitergeleiteteMails: WeitergeleiteteMail[] = [];
  eingang = true;
  ausgang = false;
  weitergeleitet = false;
  emailsNachStart: Email[] = [];
  geloescht = false;
  showAnswer = false;
  showAntwortText = false;
  antwort: String = '';
  titelAntwort: String = '';
  anrufNummer = 0;

  ergebnis: Ergebnis = {verbleibendeZeit: 0};
  bewerberReaktion: BewerberReaktion = null;
  weiterleiten = false;
  weiterleitenPersonen: String[] = ['Softwarearchitekt', 'Studentischer Entwickler', 'Direkter Vorgesetzter', 'Personalabteilung', 'Kunde', 'Projektleiter'];
  selectedPerson: String;
  //showAnruf = false;

  constructor(private pruefungService: PruefungService, private ergebnisService: ErgebnisService, private notificationsService: NotificationsService, public dialog: MatDialog, public confDialog: MatDialog, public contextDialog: MatDialog) { }

  acceptCall() {
    this.resetAnrufAnzeigen.emit();
    const audio = new Audio();
    audio.src = '../../../../assets/' + this.anrufer + '.mp3';
    audio.load();
    audio.play();
    this.ergebnis.angenommeneAnrufe[this.anrufNummer] = true;
    this.ergebnisService.updateErgebnis(this.ergebnis).subscribe(e => {
      this.ergebnis = e;
    });
    this.anrufNummer ++;
    setTimeout(() => {
      this.anrufAnzeigen = false;
    }, 5000);
  }

  declineCall() {
    this.resetAnrufAnzeigen.emit();
    this.anrufNummer ++;
    this.anrufAnzeigen = false;
  }

  emailClicked(email: Email) {
    this.weiterleiten = false;
    this.showAnswer = false;
    this.selectedEmail = email;
    this.showMailText = true;
    if (this.eingang) {
      this.hasAnswers = this.selectedEmail.antworten.length > 0;
      this.showAntwortText = false;
    }
    if (this.ausgang) {
      this.showAntwortText = true;
      this.ergebnis.bewerberReaktionen.forEach(reakt => {
        if (reakt.email.id === email.id) {
          if (reakt.reaktionsArt === 'option') {
            this.titelAntwort = email.antworten[Number(reakt.text)].titel;
            this.antwort = email.antworten[Number(reakt.text)].text;

          }
          else {
            this.antwort = reakt.text;
          }
        }
      });
     }
     if (this.weitergeleitet) {
      this.ergebnis.bewerberReaktionen.forEach(reakt => {
        if (reakt.email.id === email.id) {
          this.antwort = reakt.text;
        }
      });

     }



  }
  antwortenClicked() {
    this.showAnswer = !this.showAnswer;
  }

  openCalendar() {
    
    let dialogRef = this.dialog.open(SelectDateDialogComponent, {
      width: '50vw',
      data: { ergebnis: this.ergebnis, titel: ''}
    });


  }

  toogleContext() {
    let dialogRef = this.contextDialog.open(ContextDialogComponent, {
      width: '50vw',
      data: { kontext: this.pruefung.test.kontext}
    });
  }

  weiterleitenClicked() {
    this.weiterleiten = !this.weiterleiten;
  }

  loeschenClicked() {
    let confDialogRef = this.confDialog.open(ConfirmationDialogComponent, {
      data: { titel: this.selectedEmail.titel }
    });

    confDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.mailLoeschen();
      }
    });

  }

  aufTerminClicked() {
    let dialogRef = this.dialog.open(SelectDateDialogComponent, {
      data: {ergebnis: this.ergebnis, titel: this.selectedEmail.titel }, width: '50vw'
    });
    dialogRef.afterClosed().subscribe(() => {

      this.pruefungService.getPruefungById(this.pruefung.id).subscribe( p => {
        this.pruefung = p;
      });
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
    if (this.selectedEmail.id === element.id) {
      let index = this.emails.indexOf(element);
      this.emails.splice(index, 1);
    }
  });
  this.displayedMails.forEach(element => {
    if (this.selectedEmail.id === element.id) {
      let index2 = this.displayedMails.indexOf(element);
      this.displayedMails.splice(index2, 1);
    }
  });
  
  this.showMailText = false;

}

showEingang() {
  this.eingang = true;
  this.ausgang = false;
  this.weitergeleitet = false;
  this.geloescht = false;
  this.displayedMails = this.emails;
}

showGeloescht() {
  this.eingang = false;
  this.ausgang = false;
  this.weitergeleitet = false;
  this.geloescht = true;
  this.displayedMails = this.geloeschteMails;
}
showAusgang() {
  this.eingang = false;
  this.ausgang = true;
  this.weitergeleitet = false;
  this.geloescht = false;
  let mails: Email[] = [];
  if (this.ergebnis.bewerberReaktionen) {
    this.ergebnis.bewerberReaktionen.forEach( reakt => {
      if (reakt.reaktionsArt === 'option' || reakt.reaktionsArt === 'antwort') {
        mails.push(reakt.email);
      }
    });
  }
  this.displayedMails = mails;
}

showWeiterleiten() {
  this.eingang = false;
  this.ausgang = false;
  this.weitergeleitet = true;
  this.geloescht = false;
  let mails: Email[] = [];
  if (this.ergebnis.bewerberReaktionen) {
    this.ergebnis.bewerberReaktionen.forEach( reakt => {
      if (reakt.reaktionsArt === 'weiterleiten') {
        mails.push(reakt.email);
      }
    });
  }
  this.displayedMails = mails;
}


mailLoeschen() {
  this.bewerberReaktion = {
    reaktionsArt: 'loeschen',
    email: this.selectedEmail,
    text: 'gelöscht'
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

  this.geloeschteMails.push(this.selectedEmail);
  this.emails.forEach(element => {
    if (this.selectedEmail.id === element.id) {
      let index = this.emails.indexOf(element);
      this.emails.splice(index, 1);
    }
  });
  this.displayedMails.forEach(element => {
    if (this.selectedEmail.id === element.id) {
      let index2 = this.displayedMails.indexOf(element);
      this.displayedMails.splice(index2, 1);
    }
  });
  this.showMailText = false;

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

    this.weitergeleiteteMails.push({email : this.selectedEmail, an: this.bewerberReaktion.text});
    this.emails.forEach(element => {
      if (this.selectedEmail.id === element.id) {
        let index = this.emails.indexOf(element);
        this.emails.splice(index, 1);
      }
    });
    this.displayedMails.forEach(element => {
      if (this.selectedEmail.id === element.id) {
        let index2 = this.displayedMails.indexOf(element);
        this.displayedMails.splice(index2, 1);
      }
    });
    this.showMailText = false;

  }

  sendOption(i) {
    if (this.selectedEmail.antworten[i].folgeMail) {
     // this.displayedMails.unshift(this.selectedEmail.antworten[i].folgeMail);
      let email = {
        titel: this.selectedEmail.antworten[i].folgeMail.titel,
        text: this.selectedEmail.antworten[i].folgeMail.text,
        absender: this.selectedEmail.antworten[i].folgeMail.absender,
        absendeDatum: this.selectedEmail.antworten[i].folgeMail.absendeDatum,
        aktiv: true,
        prioritaet: this.selectedEmail.antworten[i].folgeMail.prioritaet,
        erscheintDirekt: this.selectedEmail.antworten[i].folgeMail.erscheintDirekt,
        istFolgemail: true,
        erscheintNachMS: this.selectedEmail.antworten[i].folgeMail.erscheintNachMS,
        antworten: this.selectedEmail.antworten[i].folgeMail.antworten,
        punkte: this.selectedEmail.antworten[i].folgeMail.punkte,
        antwortenPunkte: this.selectedEmail.antworten[i].folgeMail.antwortenPunkte,
        weiterleitenPunkte: this.selectedEmail.antworten[i].folgeMail.weiterleitenPunkte,
        loeschenPunkte: this.selectedEmail.antworten[i].folgeMail.loeschenPunkte
      };

      this.displayedMails.unshift(email);
      console.log(this.displayedMails);
    }
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
      if (this.selectedEmail.id === element.id) {
        let index = this.emails.indexOf(element);
        this.emails.splice(index, 1);
      }
    });

    
    this.displayedMails.forEach(element => {
      if (this.selectedEmail.id === element.id) {
        let index2 = this.displayedMails.indexOf(element);
        this.displayedMails.splice(index2, 1);
      }
    });

    this.showMailText = false;
  }
 
  ngOnInit() {
    this.pruefung.ergebnis = this.ergebnis;
    this.pruefungService.updatePruefung(this.pruefung).subscribe( p => {
      this.ergebnis = p.ergebnis;
    });
 

    this.emails = this.pruefung.test.emails;
    this.displayedMails = [];
    let emailsNachStart: Email[] = [];
    this.emails.forEach( email => {
      
      if (!email.erscheintDirekt) {
        emailsNachStart.push(email);
      }
      else {
        this.displayedMails.push(email);
      }
    });
    this.emailsNachStart = emailsNachStart;
    this.displayedMails.sort((e1, e2) =>  e1.absendeDatum - e2.absendeDatum);
    
/*
    this.ergebnisService.createErgebnis(this.ergebnis).subscribe(e => {
      this.ergebnis = e;
    });
*/
    //this.displayedMails = this.emails = this.pruefung.test.emails;
  }

}


export interface WeitergeleiteteMail {
  email: Email;
  an: String;
}

