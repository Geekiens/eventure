import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
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
  constructor(public dialog: MatDialog, private router: Router) { }

  toogleBewerber() {
    this.showAllBewerber = !this.showAllBewerber;
  }

  addTestToBewerber() {

  }

  generatePassword() {

  }

  evaluateTest() {
    this.router.navigate(['bewerberVerwaltung/bewerten']);

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
