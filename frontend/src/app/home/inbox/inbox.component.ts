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
  selectedEmail: Email = null;

  constructor(private notificationsService: NotificationsService) { }

  emailClicked(email: Email) {
    this.selectedEmail = email;
  }

  ngOnInit() {
     this.emails = this.getEmails();
  }


  getEmails() {
      return [
        {
          absender: 'Peter Müller',
          titel: 'Terminabsprache',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
           Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
           Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
           Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
           Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          sum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam vol
          uptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor s
          it amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et 
          justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscin
          g elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
           sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Peter Müller',
          titel: 'Urlaub',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Franz Meier',
          titel: 'Gehaltsgespräch',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung2',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
          absendeDatum: '2018-05-30',
          priortaet: 'normal',
          erscheintDirekt: true,
        },
        {
          absender: 'Max Mustermann',
          titel: 'Bewerbung3',
          text: `Lorem ipsum dolor sit amet, consetetur sadipscing el diam voluptua. At vero eos et accusam
          et justo duo dono sea takimata sanctus est Lorem ipsum dolor sit `,
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

