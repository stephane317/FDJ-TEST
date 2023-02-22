import { Component, Input } from '@angular/core';
import { IPlayer } from 'src/app/shared/interface/player.interface';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.css'],
})
export class PlayerCardComponent {
  @Input() player: IPlayer;
}
