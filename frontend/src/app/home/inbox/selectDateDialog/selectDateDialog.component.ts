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
  kalendereintraege: Kalendereintrag[];
  tag1: Kalendereintrag[] = [];
  tag2: Kalendereintrag[] = [];
  tag3: Kalendereintrag[] = [];

  constructor(private ergebnisService: ErgebnisService, public dialogRef: MatDialogRef<SelectDateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    }

    sendKalendereintrag() {
      let ergebnis: Ergebnis = this.data.ergebnis;
      let start: String = this.von.getHours().toString();
      let ende: String = this.bis.getHours().toString();
      let endeMinuten: String = this.bis.getMinutes().toString();
      let startMinuten: String = this.von.getMinutes().toString();
      this.kalendereintrag = {
        titel: this.data.titel,
        tag: this.tag,
        start: start,
        ende: ende,
        endeMinuten: endeMinuten,
        startMinuten: startMinuten
      };
      if (!this.data.ergebnis.kalendereintraege) {
        this.data.ergebnis.kalendereintraege = [];
      }
      ergebnis.kalendereintraege.push(this.kalendereintrag);
      this.ergebnisService.updateErgebnis(ergebnis).subscribe( e => {
      });
      this.dialogRef.close();

    }

    update() {
    if (this.kalendereintraege) {
     this.kalendereintraege.forEach(k => {
        switch (k.tag) {
          case '1':
              this.tag1.push(k);
            break;
          case '2':
              this.tag2.push(k);
            break;
          case '3':
              this.tag3.push(k);
            break;
          default:
            break;
        }
      });
      this.tag1 = this.sortiere(this.tag1);
      this.tag2 = this.sortiere(this.tag2);
      this.tag3 = this.sortiere(this.tag3);
    }
    }

    sortiere(arr: Kalendereintrag[]) {
      let retArr: Kalendereintrag[] = [];
      while (arr.length > 0) {
        let earliest: Kalendereintrag = arr[0];
        arr.forEach( t => {
          if (Number(t.start) < Number(earliest.start) || (Number(t.start) === Number(earliest.start) && Number(t.startMinuten) < Number(earliest.startMinuten)) ) {
            earliest = t;
          }
        });
        retArr.push(earliest);
        arr.splice(arr.indexOf(earliest), 1);
      }
      return retArr;
    }

    ngOnInit() {
      this.kalendereintraege = this.data.ergebnis.kalendereintraege;
      this.update();
      this.von.setHours(12, 0);
      this.bis.setHours(13, 0);

    }
}

export interface DialogData {
  ergebnis: Ergebnis;
  titel: string;
}
