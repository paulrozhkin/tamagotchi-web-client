import {Injectable, PipeTransform} from '@angular/core';
import {Restaurant, RestaurantCreateInfo, RestaurantUpdateInfo} from '../models';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, filter, map, switchMap, tap} from 'rxjs/operators';
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


function matches(restaurant: Restaurant, term: string, pipe: PipeTransform) {
  const isMatch = restaurant.address.toLowerCase().includes(term.toLowerCase())
    || pipe.transform(restaurant.positionLatitude).includes(term)
    || pipe.transform(restaurant.positionLongitude).includes(term);

  return isMatch;
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
      switchMap(() => this._search()),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._restaurants$.next(result.restaurants);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

  public refresh() {
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

    // TODO: need normal pagination on the server.
    return this.apiService.get('/restaurants').pipe(
      map(
        restaurantsMap => ({
          restaurants: restaurantsMap.filter(
            restaurant => matches(restaurant, searchTerm, this.pipe)
          ).slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize), total: restaurantsMap.length
        } as SearchResult)
      )
    );
  }

  createRestaurant(info: RestaurantCreateInfo) {
    return this.apiService.post('/restaurants', info);
  }

  updateRestaurant(id: number, info: RestaurantUpdateInfo) {
    return this.apiService.put(`/restaurants/${id}`, info);
  }

  getById(id: number) {
    return this.apiService.get(`/restaurants/${id}`);
  }
}
