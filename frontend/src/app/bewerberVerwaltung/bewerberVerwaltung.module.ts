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


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    BewerberVerwaltungRoutingModule
  ],
  declarations: [
    BewerberVerwaltungComponent,
    EvaluateTestComponent,
    AddBewerberDialogComponent
  ],
  entryComponents: [AddBewerberDialogComponent],

})
export class BewerberVerwaltungModule { }
