import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchLeagueComponent } from './search-league/search-league.component';

const routes: Routes = [
  {
    path: '',
    component: SearchLeagueComponent,
    children: [
      {
        path: ':leagueId/teams',
        loadChildren: () =>
          import('./team-list/team-list.module').then((m) => m.TeamListModule),
      },
      {
        path: ':teamId/players',
        loadChildren: () =>
          import('./player-list/player-list.module').then(
            (m) => m.PlayerListModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeagueRoutingModule {}
