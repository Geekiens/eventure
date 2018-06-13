import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';

import { SelectDateDialogComponent } from '@app/home/inbox/selectDateDialog/selectDateDialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';




@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {
  showMailText = false;
  emails: Email[];
  selectedEmail: Email = null;
  hasAnswers = false;
  showAnswer = false;

  constructor(private notificationsService: NotificationsService, public dialog: MatDialog) { }

  emailClicked(email: Email) {
    this.showAnswer = false;
    this.selectedEmail = email;
    this.showMailText = true;
    this.hasAnswers = this.selectedEmail.antworten.length > 0;
  }
  antwortenClicked() {
    this.showAnswer = true;
  }
  aufTerminClicked() {
    let dialogRef = this.dialog.open(SelectDateDialogComponent, {
      width: '50vw',
      data: {  }
    });
  }

  ngOnInit() {
     this.emails = this.getEmails();
  }


  getEmails() {
      return [
        {
          absender: 'Peter Müller',
          titel: 'Terminabsprache',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
           Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
           Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
           Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
           Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
          antworten: [],
        },
        {
          absender: 'Peter Müller',
          titel: 'Urlaub',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
          antworten: [
            {
              titel: 'Erlaubnis',
              text: `Hallo Herr Mustermann, <br> <br>
                     hiermit bestätige ich Ihren Urlaubsantrag.<br><br>
                     Viele Grüße<br>
                     X`,
              folgeMail: {
                           absender: 'Max Mustermann',
                           titel: 'Bewerbung4',
                           text: ``,
                           absendeDatum: '2018-05-30',
                           priortaet: 'normal',
                           erscheintDirekt: true,
                           antworten: [{
                                titel: 'Erlaubnis',
                                text: 'Lorem ipsum 3',
                           }],
                         }
            },
            {
              titel: 'Ablehnen',
              text: 'Lorem ipsum  <br> test',
            }
        ],
        },
        {
          absender: 'Franz Meier',
          titel: 'Gehaltsgespräch',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
          antworten: [],
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
          antworten: [],
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung2',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
          antworten: [],
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung3',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
          antworten: [],
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung4',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
          antworten: [],
        }
      ];
  }
}

export interface Email {
  absender: string;
  titel: string;
  text?: string;
  absendeDatum: string;
  priortaet?: string;
  erscheintDirekt: boolean;
  erscheintNachMS?: number;
  antworten: Antwort[];
}
export interface Antwort {
  titel: string;
  text: string;
  folgeMail?: Email;
}

