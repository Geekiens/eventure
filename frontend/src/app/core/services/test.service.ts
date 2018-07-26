import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from '../../../environments/environment';

@Injectable()
export class TestService {
  private eventsUrl = `${environment.url}/MARS/test`;
  private newEventSource = new BehaviorSubject<Test>(null);

  newEvent = this.newEventSource.asObservable();

  constructor(private http: HttpClient) {}

}
export interface Test {
  title: string;
}


