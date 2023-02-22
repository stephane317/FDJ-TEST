import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, filter, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { IPlayer } from 'src/app/shared/interface/player.interface';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent {
  players$: Observable<IPlayer[]>;

  constructor(private route: ActivatedRoute, private apiSrv: ApiService) {}
  ngOnInit(): void {
    this.players$ = this.route.paramMap.pipe(
      filter((paramMap: any) => paramMap.params.teamId),
      switchMap((paramMap) =>
        this.apiSrv.getPlayersByTeamId(paramMap.params.teamId)
      )
    );
  }
}
