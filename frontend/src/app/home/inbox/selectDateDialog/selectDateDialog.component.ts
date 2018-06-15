import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';




@Component({
  selector: "selectDateDialog",
  templateUrl: "./selectDateDialog.component.html",
  styleUrls: ["./selectDateDialog.component.scss"]
})
export class SelectDateDialogComponent implements OnInit {

  von: Date = new Date();
  bis: Date = new Date();

  constructor() {

    }

    ngOnInit() {
      this.von.setHours(12, 0);
      this.bis.setHours(13, 0);

    }
}
