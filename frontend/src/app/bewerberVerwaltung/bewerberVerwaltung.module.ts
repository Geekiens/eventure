import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { BewerberVerwaltungRoutingModule } from './bewerberVerwaltung-routing.module';
import { BewerberVerwaltungComponent } from './bewerberVerwaltung.component';
import { AddBewerberDialogComponent } from './addBewerberDialog/addBewerberDialog.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    BewerberVerwaltungRoutingModule
  ],
  declarations: [
    BewerberVerwaltungComponent,
    AddBewerberDialogComponent
  ],
  entryComponents: [AddBewerberDialogComponent],

})
export class BewerberVerwaltungModule { }
