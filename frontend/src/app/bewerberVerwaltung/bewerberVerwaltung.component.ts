import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Router} from '@angular/router';
import { environment } from '@env/environment';
import { AddBewerberDialogComponent } from '@app/bewerberVerwaltung/addBewerberDialog/addBewerberDialog.component';
import { EditTestOfBewerberComponent } from '@app/bewerberVerwaltung/editTestOfBewerber/editTestOfBewerber.component';
import { Bewerber, BewerberService } from '@app/core/services/bewerber.service';
import { Pruefung } from '@app/core/services/pruefung.service';
import { Ergebnis } from '@app/core/services/pruefung.service';
import {ViewEncapsulation} from '@angular/core';




@Component({
  selector: 'app-bewerberVerwaltung',
  templateUrl: './bewerberVerwaltung.component.html',
  styleUrls: ['./bewerberVerwaltung.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class BewerberVerwaltungComponent implements OnInit {

  bewerber: Bewerber[];
  displayedBewerber: Bewerber[];
  bewerberMitPruefung: Bewerber[];

  editName = false;
  editBenutzername = false;
  editPosition = false;

  showAllBewerber = true;
  showBewerberDetails = false;
  currentBewerber: Bewerber;

  labels: String[] = ['Angenommen', 'Abgelehnt', 'Offen'];
  chartColor:any[] = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ["#009900", "#e50000", "#ffff00"],
    hoverBackgroundColor: ["#00b200", "#ff0000", "#ffff44"]
  }];

  data: number[] = [];
  chartType: String = 'pie';

  pruefungenChartType: String = 'pie';
  pruefungenLabels = ['Offen', 'Bearbeitet', 'Abgeschlossen'];
  pruefungenData: number[] = [];
  pruefungenChartColor: any[] = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ["#3232ff", "#ffff00", "#009900"],
    hoverBackgroundColor: ["#0080ff", "#ffff44", "#00b200"]
}];

  constructor (private bewerberService: BewerberService, public dialog: MatDialog, public addTestToBewerberDialog: MatDialog, private router: Router) { }

  annehmen() {
    this.currentBewerber.status = 'angenommen';
    this.bewerberService.updateBewerber(this.currentBewerber);
  }

  update() {
    this.bewerberService.updateBewerber(this.currentBewerber);
  }

  ablehnen() {
    this.currentBewerber.status = 'abgelehnt';
    this.bewerberService.updateBewerber(this.currentBewerber);


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
    let addTestToBewerberDialogRef = this.addTestToBewerberDialog.open(EditTestOfBewerberComponent, {
      data: { bewerber: this.currentBewerber }
    });

  }

  generatePassword() {

  }

  evaluateTest(pruefung: Pruefung) {
    if (pruefung.status === 'abgeschlossen') {
      this.router.navigate(['bewerberVerwaltung/ergebnis'], {queryParams: {id: pruefung.id }});
    }
    if (pruefung.status === 'bearbeitet') {
      this.router.navigate(['bewerberVerwaltung/bewerten'], {queryParams: {id: pruefung.id }});
    }
  }



  showBewerber(bewerber: Bewerber) {
    this.currentBewerber = bewerber;
    this.showBewerberDetails = true;
  }

  addBewerber() {
    let dialogRef = this.dialog.open(AddBewerberDialogComponent, {
      width: '50vw',
      data: { bewerber: this.currentBewerber }
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
      this.data = [0, 0, 0, 0];
      this.pruefungenData = [0, 0, 0];
      this.bewerber.forEach( b => {
        switch (b.status) {
          case 'angenommen': this.data[0] = this.data[0] + 1;
            break;
          case 'abgelehnt': this.data[1] = this.data[1] + 1;
            break;
          case 'offen': this.data[2] = this.data[2] + 1;
            break;
          default:
            break;
        }
        
        b.pruefungen.forEach(p => {
          switch (p.status) {
            case 'offen': this.pruefungenData[0] = this.pruefungenData[0] + 1;
              break;
            case 'bearbeitet': this.pruefungenData[1] = this.pruefungenData[1] + 1;
              break;
              case 'abgeschlossen': this.pruefungenData[2] = this.pruefungenData[2] + 1;
              break;
              
            default:
              break;
          }
        });
        
      });
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
