import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { TestVerwaltungRoutingModule } from './testVerwaltung-routing.module';
import { TestVerwaltungComponent } from './testVerwaltung.component';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    TestVerwaltungRoutingModule
  ],
  declarations: [
    TestVerwaltungComponent,
  ],

})
export class TestVerwaltungModule { }
