import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '@env/environment';
import { Test } from '@app/core/services/test.service';
import { Bewerber } from '@app/core/services/bewerber.service';
import { Email } from '@app/core/services/email.service';


@Injectable()
export class ErgebnisService {
    // private ErgebnisUrl = 'localhost:8080/assessment';
    private newErgebnisSource = new BehaviorSubject<Ergebnis>(null);
    private updatedErgebnisSource = new BehaviorSubject<Ergebnis>(null);



    newErgebnis = this.newErgebnisSource.asObservable();


    constructor(private http: HttpClient) {}

    public createErgebnis(ergebnis: Ergebnis) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      };
      return this.http.post<Ergebnis>('http://localhost:8080/assessment/createErgebnis', ergebnis, httpOptions);
      /*
        .subscribe(retErgebnis => {
          this.newErgebnisSource.next(retErgebnis);
          this.newErgebnisSource.next(null);
        });
        */

    }

    public updateErgebnis(ergebnis: Ergebnis) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        };
        return this.http.post<Ergebnis>('http://localhost:8080/assessment/updateErgebnis', ergebnis, httpOptions)
        /*
          .subscribe(resergebnis => {
            this.updatedErgebnisSource.next(resergebnis);
            this.updatedErgebnisSource.next(null);
          });
          */
      }

}

export interface Ergebnis {
    bewerberReaktionen?: BewerberReaktion[];
    verbleibendeZeit?: number;
    videoPfad: String;
    id?: string;
    kalendereintraege?: Kalendereintrag[];
    punkteAntworten?: number[];
    punkteOptionen?: number[];
    punkteWeiterleiten?: number[];
    punkteLoeschen?: number[];
    punkteSumme?: number[];
}

export interface BewerberReaktion {
    reaktionsArt?: String;
    text?: String;
    email: Email;
    id?: string;
}

export interface Kalendereintrag {
    tag?: String;
    start?: String;
    ende?: String;
    startMinuten?: String;
    endeMinuten?: String;
    titel: String;
    id?: string;
}


