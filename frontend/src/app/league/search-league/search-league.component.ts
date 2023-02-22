import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, debounceTime, switchMap } from 'rxjs';
import { ApiService } from 'src/app/shared/api/api.service';
import { ILeague } from 'src/app/shared/interface/league.interface';

@Component({
  selector: 'app-search-league',
  templateUrl: './search-league.component.html',
  styleUrls: ['./search-league.component.css'],
})
export class SearchLeagueComponent {
  searchLeagueForm: FormGroup<{ search: FormControl<string | null> }>;
  leagues$: Observable<ILeague[]>;
  constructor(
    private fb: FormBuilder,
    private apiSrv: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.searchLeagueForm = this.fb.group({
      search: [''],
    });
    this.listenForm();
  }
  listenForm() {
    this.leagues$ = this.searchLeagueForm.valueChanges.pipe(
      debounceTime(200),
      switchMap((value) => this.apiSrv.searchLeague(value.search as string)),
      map((leagues: ILeague[]) => leagues)
    );
  }
  onSelectedLeague(value: ILeague) {
    this.router.navigateByUrl(`league/${value._id}/teams`);
  }
}
