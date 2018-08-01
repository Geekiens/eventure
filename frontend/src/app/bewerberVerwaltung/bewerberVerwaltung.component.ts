import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import { environment } from '@env/environment';
import { AddBewerberDialogComponent } from '@app/bewerberVerwaltung/addBewerberDialog/addBewerberDialog.component';
import { Bewerber, BewerberService } from '@app/core/services/bewerber.service';
import { Pruefung } from '@app/core/services/pruefung.service';
import { Ergebnis } from '@app/core/services/pruefung.service';


@Component({
  selector: 'app-bewerberVerwaltung',
  templateUrl: './bewerberVerwaltung.component.html',
  styleUrls: ['./bewerberVerwaltung.component.scss']
})
export class BewerberVerwaltungComponent implements OnInit {

  bewerber: Bewerber[];
  displayedBewerber: Bewerber[];
  bewerberMitPruefung: Bewerber[];

  showAllBewerber = true;
  showBewerberDetails = false;
  currentBewerber: Bewerber;

  constructor(private bewerberService: BewerberService, public dialog: MatDialog, private router: Router) { }

  annehmen() {
    this.currentBewerber.status = 'angenommen';
    this.bewerberService.updateBewerber(this.currentBewerber);
  }

  ablehnen() {
    this.currentBewerber.status = 'abgelehnt';

  }

  toogleBewerber() {
    this.showAllBewerber = !this.showAllBewerber;
    this.updateDisplayedBewerber();
  }

  updateDisplayedBewerber() {
    if (this.showAllBewerber) {
      this.displayedBewerber = this.bewerber;
    } else {
      this.bewerberMitPruefung = [];
      this.bewerber.forEach( b => {
        let contains = false;
        if (b.pruefungen) {
          b.pruefungen.forEach ( p => {
            if (p.status === 'bearbeitet') {
              contains = true;
            }
          });
          if (contains) {
            this.bewerberMitPruefung.push(b);
          }
        }

      });
      this.displayedBewerber = this.bewerberMitPruefung;
    }
  }

  addTestToBewerber() {

  }

  generatePassword() {

  }

  evaluateTest(pruefung: Pruefung) {
    this.router.navigate(['bewerberVerwaltung/bewerten'], {queryParams: {id: pruefung.id }
      });

  }



  showBewerber(bewerber: Bewerber) {
    this.currentBewerber = bewerber;
    this.showBewerberDetails = true;
  }

  addBewerber() {
    let dialogRef = this.dialog.open(AddBewerberDialogComponent, {
      width: '50vw',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBewerber();
    });
  }

  getAnzahlBeantwortet(ergebnis: Ergebnis) {
    let counter = 0;
    console.log(ergebnis)
    ergebnis.bewerberReaktionen.forEach( reakt => {
      if (reakt.reaktionsArt === 'antwort' || reakt.reaktionsArt === 'option') {
        counter ++;
      }
    });
    return counter;
  }

  getAnzahlWeitergeleitet(ergebnis: Ergebnis) {
    let counter = 0;
    ergebnis.bewerberReaktionen.forEach( reakt => {
      if (reakt.reaktionsArt === 'weitergeleitet') {
        counter ++;
      }
    });
    return counter;
  }

  getAnzahlGeloescht(ergebnis: Ergebnis) {
    let counter = 0;
    ergebnis.bewerberReaktionen.forEach( reakt => {
      if (reakt.reaktionsArt === 'geloescht') {
        counter ++;
      }
    });
    return  counter;
  }

  getBewerber() {
    this.bewerberService.getBewerber().subscribe( bewerber => {
      this.bewerber = bewerber;
      this.displayedBewerber = this.bewerber;
      this.showAllBewerber = true;
    });
  }

  status(bewerber) {
    if (bewerber.status === 'offen') {return 'In Bearbeitung'; }
    if (bewerber.status === 'abgelehnt') {return 'Abgelehnt'; }
    if (bewerber.status === 'angenommen') {return 'Angenommen'; }



  }

  ngOnInit() {
    this.getBewerber();
    this.showBewerberDetails = false;
    this.updateDisplayedBewerber();
  }

}
