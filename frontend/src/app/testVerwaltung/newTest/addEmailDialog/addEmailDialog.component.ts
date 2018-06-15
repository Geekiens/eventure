import { OnInit, Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TreeNode } from "primeng/api";
import { TreeModule } from "primeng/tree";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "addEmailDialog",
  templateUrl: "./addEmailDialog.component.html",
  styleUrls: ["./addEmailDialog.component.scss"]
})
export class AddEmailDialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  erscheintDirekt = false;

  punkte: number[] = [0, 0, 0, 0, 0, 0];
  maxPunkte: number[] = [0, 0, 0, 0, 0, 0];
  antwortenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  weiterleitenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  loeschenPunkte: number[] = [0, 0, 0, 0, 0, 0];

  antwortOptionen: AntwortOption[] = [];
  titel: string;
  text: string;
  editOption = false;
  hatFolgemail = false;
  emailBaum: TreeNode[];
  selection: TreeNode;
  currentAntwortOption: AntwortOption = { titel: "", text: "", punkte: this.punkte };

  constructor(private _formBuilder: FormBuilder, notificationsService: NotificationsService) {}

  optionClicked(option: AntwortOption) {
    console.log(option);
    this.currentAntwortOption = option;
    this.editOption = true;
  }
  editAbort() {
      this.punkte = [0, 0, 0, 0, 0, 0, 0];
      this.currentAntwortOption = { titel: "", text: "", punkte: this.punkte };
      this.editOption = false;
  }
  editFinished() {
    this.punkte = [0, 0, 0, 0, 0, 0, 0];
    this.currentAntwortOption = { titel: "", text: "", punkte: this.punkte };
    this.editOption = false;
  }
  removeOption(option: AntwortOption) {
    const index = this.antwortOptionen.indexOf(option);
    if (index > -1) {
      this.antwortOptionen.splice(index, 1);
    }
    this.editAbort();
  }
  saveEmail() {}
  newOption() {}

  addAnwortOption() {
    let antwortOption: AntwortOption = new AntwortOption();
    antwortOption.titel = this.currentAntwortOption.titel;
    antwortOption.text = this.currentAntwortOption.text;
    antwortOption.punkte = this.currentAntwortOption.punkte;
    if (antwortOption.titel !== "" && antwortOption.titel !== undefined) {
      this.antwortOptionen.push(antwortOption);
      console.log(this.antwortOptionen);
    }
    this.punkte = [0, 0, 0, 0, 0, 0, 0];
    this.currentAntwortOption = { titel: "", text: "", punkte: this.punkte };
    console.log(this.antwortOptionen);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
      firstCtrl1: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
    });

    this.emailBaum = [
      {
        label: "1. Mail",
        expanded: true,
        children: [
          {
            label: "1. Folgemail",
            expanded: true,
            children: [
              {
                label: "weitere Folgemail"
              },
              {
                label: "weitere Folgemail"
              }
            ]
          },
          {
            label: "2. Folgemail",
            expanded: true,
            children: [
              {
                label: "weitere Folgemail"
              },
              {
                label: "weitere Folgemail"
              }
            ]
          }
        ]
      }
    ];
  }
}

export class AntwortOption {
  titel: string;
  text: string;
  punkte: number[];
}
