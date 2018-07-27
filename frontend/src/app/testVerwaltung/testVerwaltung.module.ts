import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { TestVerwaltungRoutingModule } from '@app/testVerwaltung/testVerwaltung-routing.module';
import { TestVerwaltungComponent } from '@app/testVerwaltung/testVerwaltung.component';
import { NewTestComponent } from '@app/testVerwaltung/newTest/newTest.component';
import { AddEmailDialogComponent } from '@app/testVerwaltung/newTest/addEmailDialog/addEmailDialog.component';
import { FormsModule } from '@angular/forms';
import { EmailService } from '@app/core/services/email.service';
import { TestService } from '@app/core/services/test.service';

//PrimeNG
import {OrganizationChartModule} from 'primeng/organizationchart';
import {TreeModule} from 'primeng/tree';





@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    OrganizationChartModule,
    TreeModule,
    TestVerwaltungRoutingModule
  ],
  declarations: [
    TestVerwaltungComponent,
    NewTestComponent,
    AddEmailDialogComponent
  ],
  providers: [
    EmailService,
    TestService
  ],
  entryComponents: [AddEmailDialogComponent],


})
export class TestVerwaltungModule { }
