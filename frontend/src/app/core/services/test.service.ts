import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '@env/environment';
import { Email } from '@app/core/services/email.service';


@Injectable()
export class TestService {
  //private testUrl = 'localhost:8080/assessment';
  private newTestSource = new BehaviorSubject<Test>(null);

  newtest = this.newTestSource.asObservable();

  constructor(private http: HttpClient) {}

  public createTest(test: Test) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<Test>('http://localhost:8080/assessment/createTest', test, httpOptions)
      .subscribe(test => {
        this.newTestSource.next(test);
        this.newTestSource.next(null);
      });
  }

  public getTests() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    return this.http.get<Test[]>('http://localhost:8080/assessment/getTests', httpOptions);
  }

}
export interface Test {
  titel: String;
  zeit?: number;
  position?: String;
  beschreibung?: String;
  kontext?: String;
  emails?: Email[];
}


