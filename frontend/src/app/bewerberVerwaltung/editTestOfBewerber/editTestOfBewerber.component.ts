import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ErgebnisService, Ergebnis, BewerberReaktion, Kalendereintrag } from '@app/core/services/ergebnis.service';
import { Bewerber, BewerberService } from '@app/core/services/bewerber.service';
import { TestService, Test } from '@app/core/services/test.service';



@Component({
  selector: "editTestOfBewerber",
  templateUrl: "./editTestOfBewerber.component.html",
  styleUrls: ["./editTestOfBewerber.component.scss"]
})
export class EditTestOfBewerberComponent implements OnInit {

  bewerber: Bewerber;
  tests: Test[];
  testsChecked: TestChecked[] = [];


  constructor(private testService: TestService, public dialogRef: MatDialogRef<EditTestOfBewerberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }

    sendKalendereintrag() {
 
        this.bewerber = this.data.bewerber;
        
/*
    
      if (!this.data.ergebnis.kalendereintraege) {
        this.data.ergebnis.kalendereintraege = [];
      }
      ergebnis.kalendereintraege.push(this.kalendereintrag);
      this.ergebnisService.updateErgebnis(ergebnis).subscribe( e => {
      });
      this.dialogRef.close();
*/
    }

    update() {
    }

    ngOnInit() {
      this.bewerber = this.data.bewerber;
      this.testService.getTests().subscribe( tests => {
        this.tests = tests;
        tests.forEach( test => {
          this.testsChecked.push({
            test: test,
            checked: false
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
}

