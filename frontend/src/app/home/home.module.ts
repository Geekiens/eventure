import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from '@app/home/home-routing.module';
import { I18nService } from '@app/core/i18n.service';

import { HomeComponent } from '@app/home/home.component';
import { QuoteService } from '@app/home/quote.service';
import { CountdownModule } from 'ngx-countdown';
import {InboxComponent} from '@app/home/inbox/inbox.component';
import {CalendarModule} from 'primeng/calendar';
import { SelectDateDialogComponent } from '@app/home/inbox/selectDateDialog/selectDateDialog.component';
import { ConfirmationDialogComponent } from '@app/home/inbox/confirmationDialog/confirmationDialog.component';
import { ContextDialogComponent } from '@app/home/inbox/contextDialog/contextDialog.component';


import { BewerberService } from '@app/core/services/bewerber.service';
import { PruefungService } from '@app/core/services/pruefung.service';
import { ErgebnisService } from '@app/core/services/ergebnis.service';

import { AuthenticationService } from '@app/core/authentication/authentication.service';






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
    HomeRoutingModule,
  ],
  declarations: [
    ConfirmationDialogComponent,
    SelectDateDialogComponent,
    ContextDialogComponent,
    InboxComponent,
    HomeComponent
  ],
  providers: [
    I18nService,
    QuoteService,
    BewerberService,
    PruefungService,
    ErgebnisService,
    AuthenticationService,
  ],
  entryComponents: [SelectDateDialogComponent, ConfirmationDialogComponent, ContextDialogComponent],

})
export class HomeModule { }
