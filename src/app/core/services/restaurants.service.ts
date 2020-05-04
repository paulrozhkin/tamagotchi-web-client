import {Injectable, PipeTransform} from '@angular/core';
import {Restaurant} from '../models';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, filter, switchMap, tap} from 'rxjs/operators';
import {ApiService} from './api.service';

interface SearchResult {
  restaurants: Restaurant[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}


function matches(country: Restaurant, term: string, pipe: PipeTransform) {
  return country.name.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(country.area).includes(term)
    || pipe.transform(country.population).includes(term);
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {

  // tslint:disable-next-line:variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line:variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line:variable-name
  private _restaurants$ = new BehaviorSubject<Restaurant[]>([]);
  // tslint:disable-next-line:variable-name
  private _total$ = new BehaviorSubject<number>(0);

  private state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: ''
  };

  constructor(private pipe: DecimalPipe, private apiService: ApiService) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._restaurants$.next(result.restaurants);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  get page() {
    return this.state.page;
  }

  set page(page: number) {
    this._set({page});
  }

  get restaurants$() {
    return this._restaurants$.asObservable();
  }

  get total$() {
    return this._total$.asObservable();
  }

  get loading$() {
    return this._loading$.asObservable();
  }

  get pageSize() {
    return this.state.pageSize;
  }

  set pageSize(pageSize: number) {
    this._set({pageSize});
  }


  get searchTerm() {
    return this.state.searchTerm;
  }

  set searchTerm(searchTerm: string) {
    this._set({searchTerm});
  }

  private _set(patch: Partial<State>) {
    Object.assign(this.state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {pageSize, page, searchTerm} = this.state;

    return this.apiService.get('/management-restaurants').pipe(
      filter(restaurant => matches(restaurant, searchTerm, this.pipe))
    );
    // 1. filter
    // management-restaurants = management-restaurants.filter(country => matches(country, searchTerm, this.pipe));
    // const total = management-restaurants.length;
    //
    // // 2. paginate
    // management-restaurants = management-restaurants.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    // return of({management-restaurants, total});
  }
}
