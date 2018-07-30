import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ErgebnisService, Ergebnis, BewerberReaktion, Kalendereintrag } from '@app/core/services/ergebnis.service';





@Component({
  selector: "selectDateDialog",
  templateUrl: "./selectDateDialog.component.html",
  styleUrls: ["./selectDateDialog.component.scss"]
})
export class SelectDateDialogComponent implements OnInit {

  tag: String = '1';

  von: Date = new Date();
  bis: Date = new Date();

  kalendereintrag: Kalendereintrag;

  

  constructor(private ergebnisService: ErgebnisService, public dialogRef: MatDialogRef<SelectDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }

    sendKalendereintrag() {
      let ergebnis: Ergebnis = this.data.ergebnis;
      let start: String = this.von.getHours() + ':' + this.von.getMinutes();
      let ende: String = this.bis.getHours() + ':' + this.bis.getMinutes();
      this.kalendereintrag = {
        titel: this.data.titel,
        tag: this.tag,
        start: start,
        ende: ende
      };
      if (!this.data.ergebnis.kalendereintraege) {
        this.data.ergebnis.kalendereintraege = [];
      }
      ergebnis.kalendereintraege.push(this.kalendereintrag);
      console.log(ergebnis);
      this.ergebnisService.updateErgebnis(ergebnis).subscribe( e => {
      });
      this.dialogRef.close();

    }

    ngOnInit() {
      this.von.setHours(12, 0);
      this.bis.setHours(13, 0);

    }
}

export interface DialogData {
  ergebnis: Ergebnis;
  titel: string;
}
