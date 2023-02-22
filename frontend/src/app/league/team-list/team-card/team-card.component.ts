import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITeam } from 'src/app/shared/interface/team.interface';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css'],
})
export class TeamCardComponent {
  @Input() team: ITeam;

  @Output() selectedTeam = new EventEmitter<ITeam>();

  constructor() {}

  selectTeam() {
    this.selectedTeam.emit(this.team);
  }
}
