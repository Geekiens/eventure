import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { environment } from '@env/environment';
import { AddBewerberDialogComponent } from '@app/bewerberVerwaltung/addBewerberDialog/addBewerberDialog.component';

@Component({
  selector: 'app-bewerberVerwaltung',
  templateUrl: './bewerberVerwaltung.component.html',
  styleUrls: ['./bewerberVerwaltung.component.scss']
})
export class BewerberVerwaltungComponent implements OnInit {

  showAllBewerber = true;
  showBewerberDetails = false;
  constructor(public dialog: MatDialog) { }

  toogleBewerber() {
    this.showAllBewerber = !this.showAllBewerber;
  }

  addTestToBewerber() {

  }

  generatePassword() {

  }

  



  showBewerber(bewerber: string) {
    this.showBewerberDetails = true;
  }

  addBewerber() {
    let dialogRef = this.dialog.open(AddBewerberDialogComponent, {
      width: '50vw',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  


  ngOnInit() { }

}
