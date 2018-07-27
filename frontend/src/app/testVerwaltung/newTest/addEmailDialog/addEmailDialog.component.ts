import { OnInit, Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TreeNode } from "primeng/api";
import { Email, EmailService } from '../../../core/services/email.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "addEmailDialog",
  templateUrl: "./addEmailDialog.component.html",
  styleUrls: ["./addEmailDialog.component.scss"]
})
export class AddEmailDialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  rootEmail: Email;
  rootAntworten: Antwort[];
  erscheintDirekt = false;
  punkte: number[] = [0, 0, 0, 0, 0, 0];
  maxPunkte: number[] = [0, 0, 0, 0, 0, 0];
  antwortenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  weiterleitenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  loeschenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  absendeDatum: string;
  absender: string;
  antworten: Antwort[] = [];
  titel: string;
  text: string;
  erscheintNachMS: number;
  editOption = false;
  hatFolgemail = false;
  email: Email;
  titelFolgemail: string;
  emailBaum: TreeNode[];
  selection: TreeNode;
  parentAntwort: Antwort;
  currentAntwort: Antwort = { id: '0', titel: '', text: '', punkte: this.punkte };

  constructor(public dialogRef: MatDialogRef<AddEmailDialogComponent>, private emailService: EmailService, private _formBuilder: FormBuilder, notificationsService: NotificationsService) {
  }

  buildEmail() {
    this.email = {
      absendeDatum: this.absendeDatum,
      absender: this.absender,
      aktiv: 'false',
      antworten: this.antworten,
      antwortenPunkte: this.antwortenPunkte,
      erscheintDirekt: this.erscheintDirekt,
      erscheintNachMS: this.erscheintNachMS,
      id: '0',
      loeschenPunkte: this.loeschenPunkte,
      prioritaet: 'string',
      punkte: this.maxPunkte,
      text: this.text,
      titel: this.titel,
      weiterleitenPunkte: this.weiterleitenPunkte
    };


  }
  generateChildren(antworten: Antwort[]) {
    let first = true;
    let treeString: String = '';
    if (antworten !== undefined) {
      antworten.forEach(element => {
        if (first) {
          first = false;
          if (element.folgeMail !== undefined) {
            treeString = treeString + '{ "label": "' + element.titel + '", ' +
                  '"expanded": true, ' +
                  '"children": [' + this.generateChildren(element.folgeMail.antworten) + ']}';
          } else {
          treeString = treeString + '{ "label": "' + element.titel  + '"}';
          }

        } else {
          if (element.folgeMail !== undefined) {
            treeString = treeString + ', { "label": "' + element.titel + '", ' +
                  '"expanded": true, ' +
                  '"children": [' + this.generateChildren(element.folgeMail.antworten) + ']}';
          } else {
          treeString = treeString + ', { "label": "' + element.titel  + '"}';
          }
        }
      });
   }
   return treeString;
  }
  generateTree() {
    this.buildEmail();
    let treeString: string = '';
    if (this.rootEmail !== undefined) {
      treeString = '[{ "label": "' + this.rootEmail.titel + '", ' +
      '"expanded": true, ' +
      '"children": [';
      treeString = treeString + this.generateChildren(this.rootEmail.antworten);

    } else {
      treeString = '[{ "label": "' + this.titel + '", ' +
      '"expanded": true, ' +
      '"children": [';
      treeString = treeString + this.generateChildren(this.antworten);
    }
    treeString = treeString + ']}]';
    console.log(treeString);
    this.emailBaum = JSON.parse(treeString);

    return this.emailBaum;
  }

  folgeMailSelected(event) {
    if (this.rootEmail === undefined) {
      this.buildEmail();
      this.rootEmail = this.email;
    } else {
      console.log(this.parentAntwort);
      this.buildEmail();
      this.parentAntwort.folgeMail = this.email;
      console.log(this.rootEmail);
      console.log(this.parentAntwort);
    }
    console.log(this.rootEmail);
    this.rootEmail.antworten.forEach(antwort => {
      console.log(antwort);
      this.findAntwort(antwort, event);
    });
    console.log(event.node);
  }
  findAntwort(antwort: Antwort, event) {
    if (antwort.titel === event.node.label) {
      this.parentAntwort = antwort; // parentAntwort
      this.email = antwort.folgeMail;
      this.titel = this.email.titel;
      this.antworten = [];
      this.absendeDatum = '0';
      this.erscheintDirekt = true;
      this.erscheintNachMS = 0;
      this.antwortenPunkte = [0, 0, 0, 0, 0, 0];
      this.loeschenPunkte = [0, 0, 0, 0, 0, 0];
      this.maxPunkte = [0, 0, 0, 0, 0, 0];
      this.text = '';
      this.weiterleitenPunkte = [0, 0, 0, 0, 0, 0];
      console.log('hit');
    } else if (antwort.folgeMail !== undefined && antwort.folgeMail.antworten !== undefined) {
      antwort.folgeMail.antworten.forEach(element => {
        this.findAntwort(element, event);
      });
    }
  }

  optionClicked(option: Antwort) {
    console.log(option);
    this.currentAntwort = option;
    this.punkte = option.punkte;
    this.editOption = true;
  }
  editAbort() {
      this.punkte = [0, 0, 0, 0, 0, 0, 0];
      this.currentAntwort = { id: '0', titel: '', text: '', punkte: this.punkte };
      this.editOption = false;
  }
  editFinished() {
    this.punkte = [0, 0, 0, 0, 0, 0, 0];
    this.currentAntwort =  { id: '0', titel: '', text: '', punkte: this.punkte };
    this.editOption = false;
  }
  removeOption(option: Antwort) {
    const index = this.antworten.indexOf(option);
    if (index > -1) {
      this.antworten.splice(index, 1);
    }
    this.editAbort();
  }
  saveEmail() {
    if (this.rootEmail === undefined) {
      this.buildEmail();
      this.rootEmail = this.email;
    }

    this.emailService.createEmail(this.rootEmail);

    this.closeDialog();

  }

  closeDialog() {
    this.dialogRef.close();

  }
  newOption() {}

  addAnwortOption() {
 
    const antwortOption: Antwort = new Antwort();
    antwortOption.titel = this.currentAntwort.titel;
    antwortOption.text = this.currentAntwort.text;
    antwortOption.punkte = this.punkte;
    antwortOption.id = '0';
    if (this.hatFolgemail) {
      
      const folgeMail: Email = {titel: this.titelFolgemail};
      antwortOption.folgeMail = folgeMail;
    }

    if (antwortOption.titel !== "" && antwortOption.titel !== undefined) {
      this.antworten.push(antwortOption);
      console.log(this.antworten);
    }
    this.punkte = [0, 0, 0, 0, 0, 0, 0];
    this.currentAntwort = { id: '0', titel: '', text: '', punkte: this.punkte };
    this.hatFolgemail = false;
    this.titelFolgemail = '';
    if (this.rootEmail !== undefined) {
      this.buildEmail();
      this.parentAntwort.folgeMail = this.email;
    }
    this.generateTree();


    console.log(this.antworten);
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ["", Validators.required],
      firstCtrl1: ["", Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
    });
/*
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
    */
  }
}

export class Antwort {
  titel: string;
  text: string;
  punkte: number[];
  id: string;
  folgeMail?: Email;
}
