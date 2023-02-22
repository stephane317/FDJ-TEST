import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/league',
    pathMatch: 'full',
  },
  {
    path: 'league',
    loadChildren: () =>
      import('./league/league.module').then((m) => m.LeagueModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
