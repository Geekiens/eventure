
import { Component, OnInit } from "@angular/core";

import { environment } from "@env/environment";
import { Router } from "@angular/router";
import { Test, TestService } from '@app/core/services/test.service';
import { Email } from '@app/core/services/email.service';



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
  showMailText = false;
  hasAnswers = false;
  config = '{leftTime: 1200, notify: [30, 60, 120, 300, 600, 900, 1199], demand: true}';
  constructor(private testService: TestService, private router: Router) {}
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
    this.emails = showTest.test.emails;
    console.log(this.emails);
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

  ngOnInit() {

     this.testService.getTests().subscribe(tests => {
      this.tests = tests;
      this.showTests = [];
      tests.forEach(test => {
        this.showTests.push({test: test, show: false});
      });
      console.log(this.showTests);
    });
  }


  getEmails() {

  }

}


export interface ShowTest {
  test: Test;
  show: boolean;
}

