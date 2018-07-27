import { Component, OnInit} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { Email, EmailService } from '@app/core/services/email.service';
import { Test, TestService } from '@app/core/services/test.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AddEmailDialogComponent } from '@app/testVerwaltung/newTest/addEmailDialog/addEmailDialog.component';






@Component({
  selector: 'app-new-test',
  templateUrl: './newTest.component.html',
  styleUrls: ['./newTest.component.scss']
})
export class NewTestComponent implements OnInit {
  titel: String = '';
  zeit: number;
  position: String = '';
  beschreibung: String = '';
  kontext: String = '';



  showMailText = false;
  emails: Email[];
  allEmails: Email[];
  testEmails: Email[] = [];
  selectedEmail: Email = null;
  hasAnswers = false;
  showAnswer = false;
  emailSelection: Email[] = [];

  constructor(private testService: TestService, private emailService: EmailService, private notificationsService: NotificationsService, public dialog: MatDialog) { }

  saveTest() {
    const test: Test = {
      titel: this.titel,
      zeit: this.zeit,
      position: this.position,
      beschreibung: this.beschreibung,
      kontext: this.kontext,
      emails: this.testEmails
    };
    this.testService.createTest(test);

    this.titel = this.position =  this.beschreibung = this.kontext = '';
    this.zeit = null;
    this.testEmails = [];
    this.emailService.getEmails().subscribe(emails => {
      this.emails = emails;
    });


    this.notificationsService.success('Test gespeichert', '', {
      timeOut: 4000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });
  }

  addEmailstoTest() {
    this.emailSelection.forEach(element => {
      this.testEmails.push(element);
      let index = this.emails.indexOf(element);
      this.emails.splice(index, 1);
    });
    this.emailSelection = [];
  }

  removeEmailFromSelection(email) {
    let index = this.testEmails.indexOf(email);
    this.testEmails.splice(index, 1);
    this.emails.push(email);
  }

  useEmailAsTemplate() {

  }


  addToSelection(event, email) {
    if (this.emailSelection.indexOf(email) === -1) {
      this.emailSelection.push(email);
    } else {
      const index = this.emailSelection.indexOf(email);
      this.emailSelection.splice(index,  1);
    }
    console.log(this.emailSelection);

  }

  createEmail() {
    let dialogRef = this.dialog.open(AddEmailDialogComponent, {
      width: '80vw',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.emailService.getEmails().subscribe(emails => {
        this.handleFilter(emails);
        this.emailSelection = [];

      });

      console.log(this.emails);
        console.log(this.testEmails);
    });


  }
  containsEmail(email): boolean {
    console.log(this.testEmails);
    for (let index = 0; index < this.testEmails.length; index++) {
      if (email.id === this.testEmails[index].id) {
        return true;
      }
    }

    return false;
  }
  handleFilter(emails) {
    let test: Email[] = [];
    this.emails = [];
    emails.forEach(email => {
        if (this.containsEmail(email)) {
          console.log('Test');
          test.push(email);
        } else {
          this.emails.push(email);
        }
        });
        this.testEmails = test;
  }
  emailClicked(email: Email) {
      this.showAnswer = true;
      this.selectedEmail = email;
      this.showMailText = true;
      this.hasAnswers = this.selectedEmail.antworten.length > 0;
  }





  ngOnInit() {
     //this.emails = this.getEmails();
    this.emailService.getEmails().subscribe(emails => {
      this.emails = emails;
    });
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

