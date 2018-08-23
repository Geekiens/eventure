import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Bewerber, BewerberService } from '@app/core/services/bewerber.service';
import { TestService, Test } from '@app/core/services/test.service';
import { Pruefung } from '@app/core/services/pruefung.service';
import { NotificationsService } from "angular2-notifications";





@Component({
  selector: "editTestOfBewerber",
  templateUrl: "./editTestOfBewerber.component.html",
  styleUrls: ["./editTestOfBewerber.component.scss"]
})
export class EditTestOfBewerberComponent implements OnInit {

  bewerber: Bewerber;
  tests: Test[];
  testsChecked: TestChecked[] = [];


  constructor(private bewerberService: BewerberService, private notificationsService: NotificationsService, private testService: TestService, public dialogRef: MatDialogRef<EditTestOfBewerberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }

    save() {
      this.testsChecked.forEach( t => {
        if (t.checked) { // hinzufügen
          if (this.bewerber.pruefungen === undefined) { // falls keine vorhanden => offensichtlich noch nicht vorhanden
            this.bewerber.pruefungen = [];
            let pruefung: Pruefung = {
              test: t.test,
              status: 'offen'
            };
            this.bewerber.pruefungen.push(pruefung);
          }
          else { // Prüfen ob schon vorhanden
            let vorhanden = false;
            this.bewerber.pruefungen.forEach( p => {
                if (p.test.id === t.test.id) {
                  vorhanden = true;
                }

            });
            if (!vorhanden) {
              let pruefung: Pruefung = {
                test: t.test,
                status: 'offen'
              };
              this.bewerber.pruefungen.push(pruefung);
            }
          }
        }
        else { // löschen
          this.bewerber.pruefungen.forEach(p => {
            if (p.test.id === t.test.id && p.status === 'offen') {
              const i = this.bewerber.pruefungen.indexOf(p);
              this.bewerber.pruefungen.splice(i, 1);
              
            }
            if (p.test.id === t.test.id && p.status !== 'offen') {
;
              this.notificationsService.alert('Sie können keine bearbeiteten Tests entfernen', '', {
                timeOut: 7000,
                pauseOnHover: true,
                clickToClose: true
              });
            }

          });
        }
      });

  
      this.bewerberService.updateBewerber(this.bewerber);
      this.dialogRef.close();

    }

    update() {
    }

    hatBewerberTest(test: Test) {
      let contains = false;
      this.bewerber.pruefungen.forEach( p => {
        if (p.test.id === test.id) {
          contains = true;
        }
      });
      return contains;
    }
    hatBewerberNichtOffenenePruefung(test: Test) {
      let contains = false;
      this.bewerber.pruefungen.forEach( p => {
        if (p.test.id === test.id) {
          if (p.status !== 'offen') {
            contains = true;
          }
        }
      });
      return contains;
    }

    ngOnInit() {
      this.bewerber = this.data.bewerber;
      this.testService.getTests().subscribe( tests => {
        this.tests = tests;
        
        tests.forEach( test => {
          this.testsChecked.push({
            test: test,
            checked: this.hatBewerberTest(test),
            disabled: this.hatBewerberNichtOffenenePruefung(test),
          });
        });
      });
      this.update();
    }
}

export interface DialogData {
  bewerber: Bewerber;
}


export class TestChecked {
  test: Test;
  checked: boolean;
  disabled: boolean;
}

