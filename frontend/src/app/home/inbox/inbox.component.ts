import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';





@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {

  emails: Email[];

  constructor(private notificationsService: NotificationsService) { }



  ngOnInit() {
     this.emails = this.getEmails();
  }

  getEmails() {
      return [
        {
          absender: 'Peter Müller',
          titel: 'Terminabsprache',
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit ',
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Peter Müller',
          titel: 'Urlaub',
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit ',
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Franz Meier',
          titel: 'Gehaltsgespräch',
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit ',
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung',
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit ',
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung2',
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit ',
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung3',
          text: 'Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit ',
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
      ]
  }
}

export interface Email {
  absender: string;
  titel: string;
  text?: string;
  absendeDatum: string;
  priortaet?: string;
  erscheintDirekt: boolean;
  erscheintNachMS?: number;
}

