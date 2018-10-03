import { Input, Component, OnInit} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { Email, EmailService } from '@app/core/services/email.service';
import { Test, TestService } from '@app/core/services/test.service';
import { Router} from '@angular/router';
import {FormControl} from '@angular/forms';



import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AddEmailDialogComponent } from '@app/testVerwaltung/newTest/addEmailDialog/addEmailDialog.component';
import { EditEmailDialogComponent } from '@app/testVerwaltung/newTest/editEmailDialog/editEmailDialog.component';


import { RouterInitializer } from '@angular/router/src/router_module';






@Component({
  selector: 'app-new-test',
  templateUrl: './newTest.component.html',
  styleUrls: ['./newTest.component.scss']
})
export class NewTestComponent implements OnInit {

  @Input() titel: String = '';
  @Input() zeit: number;
  @Input() position: String = '';
  @Input() beschreibung: String = '';
  @Input() kontext: String = '';



  //selectedAnrufe = new FormControl();
  selectedAnrufe: string[] = [];
  anrufe: string[] = ['Anrufer 1', 'Anrufer 2', 'Anrufer 3', 'Anrufer 4', 'Anrufer 4', 'Anrufer 5'];

  showMailText = false;
  emails: Email[];
  allEmails: Email[];
  @Input() testEmails: Email[] = [];
  selectedEmail: Email = null;
  hasAnswers = false;
  showAnswer = false;
  emailSelection: Email[] = [];

  constructor(private router: Router, private testService: TestService, private emailService: EmailService, private notificationsService: NotificationsService, public dialog: MatDialog, public editDialog: MatDialog) { }

  saveTest() {
    const test: Test = {
      titel: this.titel,
      zeit: this.zeit,
      position: this.position,
      beschreibung: this.beschreibung,
      kontext: this.kontext,
      anrufe: this.selectedAnrufe,
      emails: this.testEmails
    };
    this.testService.createTest(test);

    this.titel = this.position =  this.beschreibung = this.kontext = '';
    this.zeit = null;
    this.testEmails = [];
    this.emailService.getEmails().subscribe(emails => {
      this.emails = [];
      emails.forEach( e => {
        if (this.testEmails.indexOf(e) === -1) {
          this.emails.push(e);
        }
      });
      this.emails = emails;
    });


    this.notificationsService.success('Test gespeichert', '', {
      timeOut: 4000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });

    this.router.navigate(['testVerwaltung']);

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
    if (this.emailSelection.length > 0) {
    let editDialogRef = this.editDialog.open(EditEmailDialogComponent, {
      width: '80vw',
      data: { alteEmail: this.emailSelection[0] }
    });

    editDialogRef.afterClosed().subscribe(result => {
      this.emailService.getEmails().subscribe(emails => {
        this.handleFilter(emails);
        this.emailSelection = [];
      });
    });
  }

  }


  addToSelection(event, email) {
    if (this.emailSelection.indexOf(email) === -1) {
      this.emailSelection.push(email);
    } else {
      const index = this.emailSelection.indexOf(email);
      this.emailSelection.splice(index,  1);
    }

  }

  editEmail(email) {
    let editDialogRef = this.editDialog.open(EditEmailDialogComponent, {
      width: '80vw',
      data: { alteEmail: email, onlyEdit: true }
    });

    editDialogRef.afterClosed().subscribe(result => {
      this.emailService.getEmails().subscribe(emails => {
        this.handleFilter(emails);
        this.emailSelection = [];
      });
    });
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
    });


  }
  containsEmail(email): boolean {
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

}

