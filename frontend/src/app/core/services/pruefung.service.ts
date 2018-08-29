import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '@env/environment';
import { Test } from '@app/core/services/test.service';
import { Bewerber } from '@app/core/services/bewerber.service';
import { Email } from '@app/core/services/email.service';


@Injectable()
export class PruefungService {
    //private PruefungUrl = 'localhost:8080/assessment';
    private newPruefungSource = new BehaviorSubject<Pruefung>(null);
    private newPruefungenSource = new BehaviorSubject<Pruefung[]>(null);
    private updatedPruefungSource = new BehaviorSubject<Pruefung>(null);

    updatedpruefung = this.updatedPruefungSource.asObservable();
    



    newPruefung = this.newPruefungSource.asObservable();
    newPruefungen = this.newPruefungSource.asObservable();


    constructor(private http: HttpClient) {}

    public getPruefungById(id: string) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Accept': 'application/json'
            })
          };
          return this.http.get<Pruefung>(('http://localhost:8080/assessment/getPruefungByID?id=' + id), httpOptions);
        }
    public createPruefung(pruefung: Pruefung) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        })
      };

      
      return this.http.post<Pruefung>('http://localhost:8080/assessment/createPruefung', pruefung, httpOptions)
        .subscribe(pruefung => {
          this.newPruefungSource.next(pruefung);
          this.newPruefungSource.next(null);
        });
    }
    public createPruefungen(pruefungen: Pruefung[]) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        };
        return this.http.post<Pruefung[]>('http://localhost:8080/assessment/createPruefungen', pruefungen, httpOptions)
          .subscribe(pruefungen => {
            this.newPruefungenSource.next(pruefungen);
            this.newPruefungenSource.next(null);
          });
      }

      public updatePruefungSub(pruefung: Pruefung) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        };
        return this.http.post<Pruefung>('http://localhost:8080/assessment/updatePruefung', pruefung, httpOptions).subscribe(responsePruefung => {
          this.updatedPruefungSource.next(responsePruefung);
          this.updatedPruefungSource.next(null);
        });
      }
      public updatePruefung(pruefung: Pruefung) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        };
        return this.http.post<Pruefung>('http://localhost:8080/assessment/updatePruefung', pruefung, httpOptions);
      }
}
export interface Pruefung {
  test: Test;
 // bewerber?: Bewerber;
  ergebnis?: Ergebnis;
  status?: string;
  id?: string;
}
export interface Ergebnis {
    bewerberReaktionen?: BewerberReaktion[];
    verbleibendeZeit?: number;
    videoPfad?: String;
    id?: string;
    kalendereintraege?: Kalendereintrag[];
    angenommeneAnrufe?: boolean[];
    punkteAnrufer?: number[];
    punkteAntworten?: number[];
    punkteOptionen?: number[];
    punkteWeiterleiten?: number[];
    punkteKalender?: number[];
    punkteVideo?: number[];
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
