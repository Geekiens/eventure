import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
//import {environment} from '@env/environment';

@Injectable()
export class EmailService {
  private emailsUrl = 'localhost:8080/assessment';
  private newEmailSource = new BehaviorSubject<Email>(null);
  private deletedEmailSource = new BehaviorSubject<Email>(null);
  private updatedEmailSource = new BehaviorSubject<Email>(null);

  newEmail = this.newEmailSource.asObservable();
  deletedEmail = this.deletedEmailSource.asObservable();
  updatedEmail = this.updatedEmailSource.asObservable();

  constructor(private http: HttpClient) {}

  public getEmailsForTest(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    return this.http.get<Email[]>(`${this.emailsUrl}?kalenderVon=${name}&faellig=true`, httpOptions);
  }


  public getEmailById(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    return this.http.get<Email>(`${this.emailsUrl}?id=${id}`, httpOptions);
  }
  public updateEmail(email: Email) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.put<Email>(`${this.emailsUrl}/${email.id}`, email, httpOptions)
      .subscribe(responseEmail => {
        this.updatedEmailSource.next(responseEmail);
        this.updatedEmailSource.next(null);
      });
  }

  public createEmail(email: Email) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post<Email>('http://localhost:8080/assessment/createEmail', email, httpOptions)
      .subscribe(email => {
        this.newEmailSource.next(email);
        this.newEmailSource.next(null);
      });
  }

  public deleteEmail(email: Email) {
    return this.http.delete<String>(`${this.emailsUrl}/${email.id}`)
      .subscribe(() => {
        this.deletedEmailSource.next(email);
        this.deletedEmailSource.next(null);
      });
  }

}

export interface Email {
  titel: string;
  text?: string;
  absender?: string;
  absendeDatum?: string;
  prioritaet?: string;
  erscheintDirekt?: boolean;
  erscheintNachMS?: number;
  antworten?: Antwort[];
  id?: string;
  aktiv?: string;
  punkte?: number[];
  antwortenPunkte?: number[];
  weiterleitenPunkte?: number[];
  loeschenPunkte?: number[];
}

export interface Antwort {
  titel: string;
  text: string;
  punkte: number[];
  id: string;
  folgeMail?: Email;
}
