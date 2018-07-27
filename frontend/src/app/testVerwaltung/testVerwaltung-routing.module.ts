import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { TestVerwaltungComponent } from '@app/testVerwaltung/testVerwaltung.component';
import { NewTestComponent } from '@app/testVerwaltung/newTest/newTest.component';


const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: TestVerwaltungComponent, data: { title: extract('Test Verwaltung') } },
  { path: 'neuerTest', component: NewTestComponent, data: { title: extract('Test Verwaltung') } }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class TestVerwaltungRoutingModule { }
