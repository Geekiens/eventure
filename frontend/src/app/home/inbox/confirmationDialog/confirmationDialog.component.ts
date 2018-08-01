import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';





@Component({
  selector: "confirmationDialog",
  templateUrl: "./confirmationDialog.component.html",
  styleUrls: ["./confirmationDialog.component.scss"]
})
export class ConfirmationDialogComponent implements OnInit {


  constructor(public confDialog: MatDialogRef<ConfirmationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {


}

ngOnInit() {

}

}