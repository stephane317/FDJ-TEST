import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchLeagueComponent } from './search-league/search-league.component';
import { LeagueRoutingModule } from './league-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [SearchLeagueComponent],
  imports: [CommonModule, LeagueRoutingModule, SharedModule],
})
export class LeagueModule {}
