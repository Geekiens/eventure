import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Route } from '@app/core';

const routes: Routes = [
  Route.withShell([
    { path: 'about', loadChildren: 'app/about/about.module#AboutModule' },
    { path: 'bewerberVerwaltung', loadChildren: 'app/bewerberVerwaltung/bewerberVerwaltung.module#BewerberVerwaltungModule' },
    { path: 'testVerwaltung', loadChildren: 'app/testVerwaltung/testVerwaltung.module#TestVerwaltungModule' }


  ]),
  // Fallback when no prior route is matched
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
