import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from '@app/home/home-routing.module';
import { HomeComponent } from '@app/home/home.component';
import { QuoteService } from '@app/home/quote.service';
import { CountdownModule } from 'ngx-countdown';
import {InboxComponent} from '@app/home/inbox/inbox.component';
import {CalendarModule} from 'primeng/calendar';
import { SelectDateDialogComponent } from '@app/home/inbox/selectDateDialog/selectDateDialog.component';



@NgModule({
  imports: [
    CommonModule,
    CountdownModule,
    TranslateModule,
    FormsModule,
    CalendarModule,
    CoreModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    HomeRoutingModule
  ],
  declarations: [
    SelectDateDialogComponent,
    InboxComponent,
    HomeComponent
  ],
  providers: [
    QuoteService
  ],
  entryComponents: [SelectDateDialogComponent],

})
export class HomeModule { }
