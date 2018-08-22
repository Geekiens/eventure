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




  constructor(public dialogRef: MatDialogRef<AddBewerberDialogComponent>, private pruefungService: PruefungService, private bewerberService: BewerberService, private testService: TestService, private _formBuilder: FormBuilder,  notificationsService: NotificationsService) {

    }
  saveBewerber() {
    this.bewerber = {
      name: this.name,
      status: 'offen',
      beworbenFuer: this.beworbenFuer,
      mailAdresse: this.mailAdresse,
      benutzername: this.benutzername,
      passwort: 'passwort'
    };
    this.bewerberService.createBewerber(this.bewerber).subscribe(bewerber => {
      this.bewerber = bewerber;
    });

  }

  saveBewerberMitPruefungen() {
    this.pruefungen = [];
    //this.saveBewerber();
    this.testsChecked.forEach(testChecked => {
      if (testChecked.checked) {
        let pruefung: Pruefung = {
          test: testChecked.test,
          status: 'offen'
        };
        this.pruefungen.push(pruefung);
      }
    });

     this.bewerber.pruefungen = this.pruefungen;
     this.bewerberService.updateBewerber(this.bewerber);
     this.dialogRef.close();


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
