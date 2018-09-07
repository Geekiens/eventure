import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



@Component({
  selector: "contextDialog",
  templateUrl: "./contextDialog.component.html",
  styleUrls: ["./contextDialog.component.scss"]
})
export class ContextDialogComponent implements OnInit {
  kontext: String = '';

  constructor(public confDialog: MatDialogRef<ContextDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {

}

ngOnInit() {
  this.kontext = this.data.kontext;
}

}

export interface DialogData {
  kontext: string;
}
