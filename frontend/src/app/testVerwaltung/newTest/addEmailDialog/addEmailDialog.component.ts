import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationsService } from "angular2-notifications";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';




@Component({
  selector: "addEmailDialog",
  templateUrl: "./addEmailDialog.component.html",
  styleUrls: ["./addEmailDialog.component.scss"]
})
export class AddEmailDialogComponent implements OnInit{

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  antwortOptionen: AntwortOption[] = [];
  titel: string;
  text: string;



  constructor(private _formBuilder: FormBuilder,  notificationsService: NotificationsService) {

    }
  saveBewerber() {
    
  }
  newOption() {
    
  }

  addAnwortOption() {
    const antwortOption: AntwortOption = new AntwortOption();
    antwortOption.titel = this.titel;
    antwortOption.text = this.text;
    if (this.titel !== '' && this.titel !== undefined) {
      this.antwortOptionen.push(antwortOption);
    }
  }

  ngOnInit() {
    
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      firstCtrl1: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
    });
  }
  
}

export class AntwortOption {
  titel: string;
  text: string;
}
