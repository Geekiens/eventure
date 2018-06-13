import {OnInit, Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NotificationsService } from "angular2-notifications";
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TreeNode} from 'primeng/api';
import {TreeModule} from 'primeng/tree';



@Component({
  selector: "addEmailDialog",
  templateUrl: "./addEmailDialog.component.html",
  styleUrls: ["./addEmailDialog.component.scss"]
})
export class AddEmailDialogComponent implements OnInit{

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  erscheintDirekt = false;

  antwortOptionen: AntwortOption[] = [];
  titel: string;
  text: string;
  hatFolgemail = false;
  emailBaum: TreeNode[];
  selection: TreeNode;


  constructor(private _formBuilder: FormBuilder,  notificationsService: NotificationsService) {

    }
  saveEmail() {
    
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


    this.emailBaum = [{
      label: '1. Mail',
      expanded: true,
      children: [
          {
              label: '1. Folgemail',
              expanded: true,
              children: [
                  {
                      label: 'weitere Folgemail'
                  },
                  {
                      label: 'weitere Folgemail'
                  }
              ]
          },
          {
              label: '2. Folgemail',
              expanded: true,
              children: [
                  {
                      label: 'weitere Folgemail'
                  },
                  {
                      label: 'weitere Folgemail'
                  }
              ]
          }
      ]
  }];
  }
  
}

export class AntwortOption {
  titel: string;
  text: string;
}
