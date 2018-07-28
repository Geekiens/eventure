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

    newPruefung = this.newPruefungSource.asObservable();

    constructor(private http: HttpClient) {}

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
}
export interface Pruefung {
  test: Test;
  bewerber?: Bewerber;
  ergebnis?: Ergebnis;
  status?: string;
  id?: string;
}

export interface Ergebnis {
    bewerberReaktion: BewerberReaktion[];
    verbleibendeZeit?: number;
    videoPfad: String;
    id?: string;
  }

  export interface BewerberReaktion {
    reaktionsArt?: String;
    text?: String;
    email: Email;
    id?: string;
  }
