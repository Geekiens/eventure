import { OnInit, Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NotificationsService } from "angular2-notifications";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TreeNode } from "primeng/api";
import { Email, EmailService } from '@app/core/services/email.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "editEmailDialog",
  templateUrl: "./editEmailDialog.component.html",
  styleUrls: ["./editEmailDialog.component.scss"]
})
export class EditEmailDialogComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  rootEmail: Email;
  rootAntworten: Antwort[];

  erscheintDirekt = true;
  punkte: number[] = [0, 0, 0, 0, 0, 0];
  maxPunkte: number[] = [0, 0, 0, 0, 0, 0];
  antwortenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  weiterleitenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  loeschenPunkte: number[] = [0, 0, 0, 0, 0, 0];
  absendeDatum: number;
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
  alteEmail: Email;
  onlyEdit = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditEmailDialogComponent>, private emailService: EmailService, private _formBuilder: FormBuilder, notificationsService: NotificationsService) {
    this.onlyEdit = data.onlyEdit;
    this.alteEmail = data.alteEmail;
    this.email = data.alteEmail;
    this.titel = this.email.titel;
    this.text = this.email.text;
    this.absender = this.email.absender;
    this.erscheintDirekt = this.email.erscheintDirekt;
    this.erscheintNachMS = this.email.erscheintNachMS;
    this.punkte = this.email.punkte;
    this.maxPunkte = this.email.punkte;
    this.antwortenPunkte = this.email.antwortenPunkte;
    this.weiterleitenPunkte = this.email.weiterleitenPunkte;
    this.loeschenPunkte = this.email.loeschenPunkte;
    this.absendeDatum = this.email.absendeDatum;
    this.antworten = this.email.antworten;
  }

  buildEmail() {
    this.email = {
      absendeDatum: this.absendeDatum,
      absender: this.absender,
      aktiv: true,
      antworten: this.antworten,
      antwortenPunkte: this.antwortenPunkte,
      erscheintDirekt: this.erscheintDirekt,
      erscheintNachMS: this.erscheintNachMS,
      loeschenPunkte: this.loeschenPunkte,
      prioritaet: 'string',
      punkte: this.maxPunkte,
      text: this.text,
      titel: this.titel,
      weiterleitenPunkte: this.weiterleitenPunkte
    };
  }

  erscheintDirektChanged() {
    if (this.erscheintDirekt) {
      this.absendeDatum = 0;
    }
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
    this.emailBaum = JSON.parse(treeString);

    return this.emailBaum;
  }

  folgeMailSelected(event) {
    if (this.rootEmail === undefined) {
      this.buildEmail();
      this.rootEmail = this.email;
    } else {
      this.buildEmail();
      this.parentAntwort.folgeMail = this.email;

    }
    this.rootEmail.antworten.forEach(antwort => {
      this.findAntwort(antwort, event);
    });
  }
  findAntwort(antwort: Antwort, event) {
    if (antwort.titel === event.node.label) {
      this.parentAntwort = antwort; // parentAntwort
      this.email = antwort.folgeMail;
      this.titel = this.email.titel;
      this.antworten = [];
      this.absendeDatum = 0;
      this.erscheintDirekt = true;
      this.erscheintNachMS = 0;
      this.antwortenPunkte = [0, 0, 0, 0, 0, 0];
      this.loeschenPunkte = [0, 0, 0, 0, 0, 0];
      this.maxPunkte = [0, 0, 0, 0, 0, 0];
      this.text = '';
      this.weiterleitenPunkte = [0, 0, 0, 0, 0, 0];
    } else if (antwort.folgeMail !== undefined && antwort.folgeMail.antworten !== undefined) {
      antwort.folgeMail.antworten.forEach(element => {
        this.findAntwort(element, event);
      });
    }
  }

  optionClicked(option: Antwort) {
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
    if (this.onlyEdit) {
      console.log('hit');
      this.alteEmail.aktiv = false;
      this.emailService.updateEmail(this.alteEmail);
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
      
      const folgeMail: Email = {titel: this.titelFolgemail, istFolgemail: true};
      antwortOption.folgeMail = folgeMail;
    }

    if (antwortOption.titel !== "" && antwortOption.titel !== undefined) {
      this.antworten.push(antwortOption);
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


  }

  setTitelFolgemail() {
    if (this.hatFolgemail) {
    this.titelFolgemail = 'Aw: Aw: ' + this.titel;
    }
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
