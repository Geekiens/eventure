import { Component, OnInit} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';
import { Email, EmailService } from '@app/core/services/email.service';
import { Test, TestService } from '@app/core/services/test.service';
import {ActivatedRoute, Router} from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { AddEmailDialogComponent } from '@app/testVerwaltung/newTest/addEmailDialog/addEmailDialog.component';
import { EditEmailDialogComponent } from '@app/testVerwaltung/newTest/editEmailDialog/editEmailDialog.component';







@Component({
  selector: 'app-edit-test',
  templateUrl: './editTest.component.html',
  styleUrls: ['./editTest.component.scss']
})
export class EditTestComponent implements OnInit {
  position: String = '';
  beschreibung: String = '';
  kontext: String = '';

  id: any;

  test: Test;
  alterTest: Test;

  showMailText = false;
  emails: Email[];
  allEmails: Email[];
  testEmails: Email[] = [];
  selectedEmail: Email = null;
  hasAnswers = false;
  showAnswer = false;
  emailSelection: Email[] = [];
  

  anrufe: string[] = ['Anrufer 1', 'Anrufer 2', 'Anrufer 3', 'Anrufer 4', 'Anrufer 4', 'Anrufer 5'];


  constructor(private router: Router, private route: ActivatedRoute, private testService: TestService, private emailService: EmailService, private notificationsService: NotificationsService, public dialog: MatDialog, public editDialog: MatDialog) {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      this.testService.getTestByID(id).subscribe(test => {
        this.test = test;
        this.alterTest = test;
        this.testEmails = test.emails;

      });
    });

  }

  saveTest() {
    const test: Test = {
      titel: this.test.titel,
      zeit: this.test.zeit,
      position: this.test.position,
      beschreibung: this.test.beschreibung,
      kontext: this.test.kontext,
      emails: this.testEmails,
      anrufe: this.test.anrufe
    };

    this.alterTest.aktiv = false;
    this.testService.updateTest(this.alterTest);
    this.testService.createTest(test);


    this.test.titel = this.test.position =  this.test.beschreibung = this.test.kontext = '';
    this.test.zeit = null;
    this.testEmails = [];
    this.emailService.getEmails().subscribe(emails => {
      this.emails = emails;
    });


    this.notificationsService.success('Test bearbeitet', '', {
      timeOut: 4000,
      showProgressBar: false,
      pauseOnHover: true,
      clickToClose: true
    });

    this.router.navigate(['testVerwaltung']);

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

