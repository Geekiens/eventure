import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '@env/environment';
import { Pruefung } from '@app/core/services/pruefung.service';



@Injectable()
export class BewerberService {
  //private BewerberUrl = 'localhost:8080/assessment';
  private newBewerberSource = new BehaviorSubject<Bewerber>(null);
  private updatedBewerberSource = new BehaviorSubject<Bewerber>(null);

  

  newbewerber = this.newBewerberSource.asObservable();
  updatedBewerber = this.updatedBewerberSource.asObservable();


  constructor(private http: HttpClient) {}

  public getBewerber() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    return this.http.get<Bewerber[]>('http://localhost:8080/assessment/getBewerber', httpOptions);
  }

  public getBewerberByBenutzername(benutzername: string) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      };
      return this.http.get<Bewerber>(('http://localhost:8080/assessment/getBewerberByBenutzername?benutzername=' + benutzername), httpOptions);
    }

  public createBewerber(bewerber: Bewerber) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<Bewerber>('http://localhost:8080/assessment/createBewerber', bewerber, httpOptions);
    /*
      .subscribe(bewerber => {
        this.newBewerberSource.next(bewerber);
        this.newBewerberSource.next(null);
      });
      */
  }

  public updateBewerber(bewerber: Bewerber) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<Bewerber>('http://localhost:8080/assessment/updateBewerber', bewerber, httpOptions)
      .subscribe(resbewerber => {
        this.updatedBewerberSource.next(resbewerber);
        this.updatedBewerberSource.next(null);
      });
  }



}
export interface Bewerber {
  id?: String;
  name: String;
  benutzername?: String;
  passwort?: String;
  mailAdresse?: String;
  beworbenFuer?: String;
  status?: String;
  pruefungen?: Pruefung[];
}


