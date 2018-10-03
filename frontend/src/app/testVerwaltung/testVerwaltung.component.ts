
import { Component, OnInit } from "@angular/core";

import { environment } from "@env/environment";
import { Router } from "@angular/router";
import { Test, TestService } from '@app/core/services/test.service';
import { Email } from '@app/core/services/email.service';
import { ConfirmationDialogComponent } from '@app/testVerwaltung/confirmationDialog/confirmationDialog.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';




@Component({
  selector: "app-testVerwaltung",
  templateUrl: "./testVerwaltung.component.html",
  styleUrls: ["./testVerwaltung.component.scss"]
})
export class TestVerwaltungComponent implements OnInit {
  tests: Test[];
  showTests: ShowTest[];
  showDetails = false;
  emails: Email[];
  showAnswer = false;
  selectedEmail: Email;
  selectedTest: Test;
  showMailText = false;
  hasAnswers = false;
  config = '{leftTime: 1200, notify: [30, 60, 120, 300, 600, 900, 1199], demand: true}';
  constructor(private testService: TestService, private router: Router, public confDialog: MatDialog) {}
  createTest() {
    this.router.navigate(['testVerwaltung/neuerTest']);  
  }
  editTest(test: Test) {
    this.router.navigate(['testVerwaltung/bearbeiteTest'], {queryParams: {
      id: test.id
    }});

  }
  
  openDetails(showTest: ShowTest) {
    showTest.show = true;
    this.selectedTest = showTest.test;
    this.emails = showTest.test.emails;
    this.showDetails = !this.showDetails;

  }
  closeDetails() {
    this.showDetails = false;
  }

  emailClicked(email: Email) {
    this.showAnswer = false;
    this.selectedEmail = email;
    this.showMailText = true;
    this.hasAnswers = this.selectedEmail.antworten.length > 0;
  }
  antwortenClicked() {
    this.showAnswer = true;
  }

  loeschenClicked() {
    let confDialogRef = this.confDialog.open(ConfirmationDialogComponent, {
      data: { titel: this.selectedTest.titel }
    });

    confDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectedTest.aktiv = false;
        this.testService.updateTest(this.selectedTest);

        setTimeout(() => {
          this.testService.getTests().subscribe(tests => {
            this.tests = tests;
            this.showTests = [];
            tests.forEach(test => {
              this.showTests.push({test: test, show: false});
            });
          });

        }, 100);
  

      }
    });

  }

  ngOnInit() {

     this.testService.getTests().subscribe(tests => {
      this.tests = tests;
      this.showTests = [];
      tests.forEach(test => {
        this.showTests.push({test: test, show: false});
      });
    });
  }


  getEmails() {

  }

}


export interface ShowTest {
  test: Test;
  show: boolean;
}

