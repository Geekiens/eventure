import { Component, OnInit} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { assertTSExpressionWithTypeArguments } from 'babel-types';







@Component({
  selector: 'app-evaluate-test',
  templateUrl: './evaluateTest.component.html',
  styleUrls: ['./evaluateTest.component.scss']
})
export class EvaluateTestComponent implements OnInit {
  reaktionen: BewerberReaktion[] = [];
  bewertung: number[] = [0,0,0,0,0,0];
  emailPunkte: number[] = [0,0,0,0,0,0];
  maxPunkte: number[] = [5,10,2,2,2,3];
  reaktion: BewerberReaktion;
  index = 0;
  allEmailsEvaluated = false;

  constructor() { }



  nextMail() {
    if (!this.allEmailsEvaluated) {
      this.index ++;
      if (this.index <= this.reaktionen.length - 1) {
        this.reaktion = this.reaktionen[this.index];
      } else {
        this.allEmailsEvaluated = true;
      }
    }
  }

  ngOnInit() {

    let email: Email = {absender: 'Oliver Meier',
                        titel: 'Bewerbung',
                        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
                        absendeDatum: '15.06.2018'};

    let reaktion: BewerberReaktion = {reaktion: 'Nö',
                                      email: email};
    this.reaktionen.push(reaktion);
    let email2: Email = {absender: 'Hans Müller',
    titel: 'Urlaubsantrag',
    text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore',
    absendeDatum: '15.06.2018'};
    let reaktion2: BewerberReaktion = {reaktion: 'Ok',
                                      email: email2};
    this.reaktionen.push(reaktion2);
    this.reaktion = this.reaktionen[this.index];
    console.log(this.reaktionen);
    console.log(this.reaktion);


  }
}

export interface BewerberReaktion {
  reaktion: string;
  email: Email;
}

export interface Email {
  absender: string;
  titel: string;
  text?: string;
  absendeDatum: string;
}
