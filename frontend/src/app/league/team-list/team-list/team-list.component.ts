import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { ITeam } from 'src/app/shared/interface/team.interface';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css'],
})
export class TeamListComponent implements OnInit {
  teams$: Observable<ITeam[]>;
  constructor(
    private route: ActivatedRoute,
    private apiSrv: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.teams$ = this.route.paramMap.pipe(
      filter((paramsMap: any) => paramsMap.params.leagueId),
      switchMap((paramsMap) =>
        this.apiSrv.getTeamsByLeagueId(paramsMap.params.leagueId)
      )
    );
  }

  selectedTeam(team: ITeam) {
    this.router.navigateByUrl(`league/${team._id}/players`);
  }
}
