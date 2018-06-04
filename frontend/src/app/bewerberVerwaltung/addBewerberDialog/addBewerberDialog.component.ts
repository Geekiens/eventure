import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationsService } from "angular2-notifications";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: "addBewerberDialog",
  templateUrl: "./addBewerberDialog.component.html",
  styleUrls: ["./addBewerberDialog.component.scss"]
})
export class AddBewerberDialogComponent implements OnInit{

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,  notificationsService: NotificationsService) {

    }
  saveBewerber() {
    
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
    });
  }
  
}
