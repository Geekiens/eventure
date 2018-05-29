import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import { CountdownModule } from 'ngx-countdown';
import {InboxComponent} from './inbox/inbox.component';


@NgModule({
  imports: [
    CommonModule,
    CountdownModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule
  ],
  declarations: [
    InboxComponent,
    HomeComponent
  ],
  providers: [
    QuoteService
  ]
})
export class HomeModule { }
