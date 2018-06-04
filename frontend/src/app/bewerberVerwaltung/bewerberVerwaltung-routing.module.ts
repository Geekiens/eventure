import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { BewerberVerwaltungComponent } from './bewerberVerwaltung.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: BewerberVerwaltungComponent, data: { title: extract('BewerberVerwaltung') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BewerberVerwaltungRoutingModule { }
