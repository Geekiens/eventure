import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '@env/environment';


@Injectable()
export class BewerberService {
  //private BewerberUrl = 'localhost:8080/assessment';
  private newBewerberSource = new BehaviorSubject<Bewerber>(null);

  newbewerber = this.newBewerberSource.asObservable();

  constructor(private http: HttpClient) {}

  public createBewerber(bewerber: Bewerber) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<Bewerber>('http://localhost:8080/assessment/createBewerber', bewerber, httpOptions)
      .subscribe(bewerber => {
        this.newBewerberSource.next(bewerber);
        this.newBewerberSource.next(null);
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
}


