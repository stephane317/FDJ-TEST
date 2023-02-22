import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamListComponent } from './team-list/team-list.component';
import { RouterModule, Routes } from '@angular/router';
import { TeamCardComponent } from './team-card/team-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TeamListComponent,
  },
];

@NgModule({
  declarations: [TeamListComponent, TeamCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class TeamListModule {}
