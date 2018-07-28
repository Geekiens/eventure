import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationsService } from "angular2-notifications";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TestService, Test } from '@app/core/services/test.service';
import { BewerberService, Bewerber } from '@app/core/services/bewerber.service';
import { PruefungService, Pruefung } from '@app/core/services/pruefung.service';






@Component({
  selector: "addBewerberDialog",
  templateUrl: "./addBewerberDialog.component.html",
  styleUrls: ["./addBewerberDialog.component.scss"]
})
export class AddBewerberDialogComponent implements OnInit{

  testsChecked: TestChecked[] = [];
  name: String;
  beworbenFuer: String;
  mailAdresse: String;
  benutzername: String;

  bewerber: Bewerber;
  pruefungen: Pruefung[];

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;




  constructor(private pruefungService: PruefungService, private bewerberService: BewerberService, private testService: TestService, private _formBuilder: FormBuilder,  notificationsService: NotificationsService) {

    }
  saveBewerber() {
    this.bewerber = {
      name: this.name,
      beworbenFuer: this.beworbenFuer,
      mailAdresse: this.mailAdresse,
      benutzername: this.benutzername
    };
    this.bewerberService.createBewerber(this.bewerber);
  }

  saveBewerberMitPruefungen() {
    this.bewerber = {
      name: this.name,
      beworbenFuer: this.beworbenFuer,
      mailAdresse: this.mailAdresse,
      benutzername: this.benutzername,
      passwort: 'passwort'
    };
    this.pruefungen = [];
    
    this.testsChecked.forEach(testChecked => {
      if (testChecked.checked) {
        let pruefung: Pruefung = {
          test: testChecked.test,
          bewerber: this.bewerber,
          status: 'offen'
        };
        this.pruefungen.push(pruefung);
      }
    });
    this.pruefungService.createPruefungen(this.pruefungen);

  }
  ngOnInit() {

    this.testService.getTests().subscribe(tests => {
      tests.forEach( test => {
        this.testsChecked.push({
          test: test,
          checked: false
        });
      });
    });
    console.log(this.testsChecked);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstCtrl1: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
    });
  }
  
}

export class TestChecked {
  test: Test;
  checked: boolean;
}
