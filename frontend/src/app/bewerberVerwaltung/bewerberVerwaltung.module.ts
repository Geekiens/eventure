import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { MaterialModule } from '@app/material.module';
import { BewerberVerwaltungRoutingModule } from '@app/bewerberVerwaltung/bewerberVerwaltung-routing.module';
import { BewerberVerwaltungComponent } from '@app/bewerberVerwaltung/bewerberVerwaltung.component';
import { AddBewerberDialogComponent } from '@app/bewerberVerwaltung/addBewerberDialog/addBewerberDialog.component';
import { EvaluateTestComponent } from '@app/bewerberVerwaltung/evaluateTest/evaluateTest.component';
import { ShowResultsComponent } from '@app/bewerberVerwaltung/showResults/showResults.component';


import { TestService } from '@app/core/services/test.service';
import { BewerberService } from '@app/core/services/bewerber.service';
import { PruefungService } from '@app/core/services/pruefung.service';

import { ChartsModule } from 'ng2-charts';


import { EditTestOfBewerberComponent } from '@app/bewerberVerwaltung/editTestOfBewerber/editTestOfBewerber.component';




@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FlexLayoutModule,
    ChartsModule,
    MaterialModule,
    BewerberVerwaltungRoutingModule
  ],
  declarations: [
    BewerberVerwaltungComponent,
    EvaluateTestComponent,
    ShowResultsComponent,
    AddBewerberDialogComponent,
    EditTestOfBewerberComponent
  ],
  providers: [
    TestService,
    BewerberService,
    PruefungService
  ],
  entryComponents: [AddBewerberDialogComponent, EditTestOfBewerberComponent],

})
export class BewerberVerwaltungModule { }
