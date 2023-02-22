import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ITeam } from '../interface/team.interface';
import { IPlayer } from '../interface/player.interface';
import { Observable } from 'rxjs';
import { ILeague } from '../interface/league.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  searchLeague(search: string): Observable<ILeague[]> {
    return this.http.post<ILeague[]>(`${environment.api}/league/search`, {
      search,
    });
  }

  getTeamsByLeagueId(leagueId: string): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(`${environment.api}/team/league/${leagueId}`);
  }

  getPlayersByTeamId(teamId: string): Observable<IPlayer[]> {
    return this.http.get<IPlayer[]>(`${environment.api}/player/team/${teamId}`);
  }
}
