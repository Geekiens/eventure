import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NotificationsService } from 'angular2-notifications';





@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss']
})
export class InboxComponent implements OnInit {


  constructor(private notificationsService: NotificationsService) { }



  ngOnInit() {

  }


}

export interface Email {
  absender: string;
  titel: string;
  text?: string;
  absendeDatum: string;
  priortaet?: string;
  ersccheintDirekt: boolean;
  erscheintNachMS?: number;
}

