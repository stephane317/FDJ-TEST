import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerListComponent } from './player-list/player-list.component';
import { Routes, RouterModule } from '@angular/router';
import { PlayerCardComponent } from './player-card/player-card.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: PlayerListComponent,
  },
];

@NgModule({
  declarations: [PlayerListComponent, PlayerCardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class PlayerListModule {}
