import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { BewerberVerwaltungComponent } from '@app/bewerberVerwaltung/bewerberVerwaltung.component';
import { EvaluateTestComponent } from '@app/bewerberVerwaltung/evaluateTest/evaluateTest.component';
import { ShowResultsComponent } from '@app/bewerberVerwaltung/showResults/showResults.component';


const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  { path: '', component: BewerberVerwaltungComponent, data: { title: extract('Bewerberverwaltung') } },
  { path: 'bewerten', component: EvaluateTestComponent, data: { title: extract('Test Bewerten') } },
  { path: 'ergebnis', component: ShowResultsComponent, data: { title: extract('Ergebnis anzeigen') } }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BewerberVerwaltungRoutingModule { }
