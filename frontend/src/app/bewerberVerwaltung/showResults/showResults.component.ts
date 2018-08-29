import { Component, OnInit, ViewChild } from "@angular/core";
import { finalize } from "rxjs/operators";
import { assertTSExpressionWithTypeArguments } from "babel-types";
import { ActivatedRoute, Router } from "@angular/router";
import { PruefungService, Pruefung, BewerberReaktion, Kalendereintrag } from '@app/core/services/pruefung.service';
import { _MatSortHeaderMixinBase } from "@angular/material";
import { NotificationsService } from 'angular2-notifications';
import {BaseChartDirective} from 'ng2-charts/ng2-charts';




@Component({
  selector: "app-show-results",
  templateUrl: "./showResults.component.html",
  styleUrls: ["./showResults.component.scss"]
})
export class ShowResultsComponent implements OnInit {
  @ViewChild("baseChart") chart: BaseChartDirective;

 // @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  pruefung: Pruefung;
  id: any;
  maximalePunkte: number[] = [0, 0, 0, 0, 0, 0];
  maximaleKalenderPunkte: number[] = [10, 10, 10, 10, 50, 10];
  maximaleVideoPunkte: number[] = [25, 25, 25, 25, 25, 25];
  durchschnittlichePunkte: number[] = [0, 0, 0, 0, 0, 0];
  durchschnittlichePunkteProzente: number[] = [0, 0, 0, 0, 0, 0];
  punkteProzent: number[] = [0, 0, 0, 0, 0, 0];
  normung: number[] = [1, 1, 1, 1, 1, 1];



  labels: String[] = ['Sozialkompetenz', 'Delegationsbereitschaft', 'Verantwortungsbewusstsein', 'Analytische Fähigkeiten', 'Arbeitsorganisation', 'Konzentrationsfähigkeit'];

  radarChartData: any = [
    {data: [0, 0, 0, 0, 0, 0], label: 'Durchschnitt'},
   {data: [0, 0, 0, 0, 0, 0], label: 'Bewerber'},
   {data: this.normung, label: 'Normalisiert'}
  ];

  chartColor:any[] = [{ // grey
    backgroundColor: 'rgba(33,150,243,0.2)',
    borderColor: 'rgba(33,150,243,1)',
    pointBackgroundColor: 'rgba(33,150,243,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(33,150,243,1)'
  },
  { // dark grey
    backgroundColor: 'rgba(255,0,200,0.2)',
    borderColor: 'rgba(255,0,200,1)',
    pointBackgroundColor: 'rgba(255,0,200,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(255,0,200,1)'
  },
  { // grey
    backgroundColor: 'rgba(148,159,177,0)',
    borderColor: 'rgba(148,159,177,0)',
    pointBackgroundColor: 'rgba(148,159,177,0)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(148,159,177,0)'
  }];

  data: number[] = [10, 10 , 10];
  chartType: String = 'radar';

  constructor(private router: Router, private route: ActivatedRoute, private pruefungService: PruefungService) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.pruefungService.getPruefungById(this.id).subscribe(p => {
        this.pruefung = p;
        console.log(p);
        this.durchschnittlichePunkte = p.test.durchschnitt;
        this.berechneMaximalePunkte(p);
      });
    });
  }
  


  berechneMaximalePunkte(p: Pruefung) {
    p.test.emails.forEach( e => {
      for (let i = 0;  i < 6; i++) {
        this.maximalePunkte[i] += e.punkte[i];
      }
    });
    for (let j = 0; j < 6; j++) {
      this.maximalePunkte[j] += this.maximaleKalenderPunkte[j];
      this.maximalePunkte[j] += this.maximaleVideoPunkte[j];
      this.durchschnittlichePunkteProzente[j] = this.durchschnittlichePunkte[j] / this.maximalePunkte[j];
      this.punkteProzent[j] = this.pruefung.ergebnis.punkteSumme[j] / this.maximalePunkte[j];
    }
    this.radarChartData[0].data = this.durchschnittlichePunkteProzente;
    this.radarChartData[1].data = this.punkteProzent;
    console.log(this.radarChartData);
  //  this.radarChartData.push({data: this.durchschnittlichePunkte, label: 'Durchschnitt'});
   // this.radarChartData.push({data: this.maximalePunkte, label: 'Bewerber'});
   // this.chart.chart.update();
    this.reloadChart();

  }

  reloadChart() {
    if (this.chart !== undefined) {
       this.chart.chart.destroy();
       this.chart.chart = 0;

       this.chart.datasets = this.radarChartData;
       this.chart.labels = this.labels;
       this.chart.ngOnInit();
    }
}









 


  nullenErgaenzen (minute: String) {
    if (minute === '0') {
      return '00';
    }
    else {
      return minute;
    }
  }

  runden(zeit) {
    return Math.round(zeit);
  }

  ngOnInit() {

  }
}

