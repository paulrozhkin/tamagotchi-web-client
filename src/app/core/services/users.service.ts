import {Injectable, PipeTransform} from '@angular/core';
import {Credentials, Restaurant, RestaurantCreateInfo, RestaurantUpdateInfo, User, UserUpdateInfo} from '../models';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DecimalPipe} from '@angular/common';
import {ApiService} from './api.service';
import {map, switchMap, tap} from 'rxjs/operators';

interface SearchResult {
  users: User[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
}

function matches(user: User, term: string, pipe: PipeTransform) {
  return user.login.toLowerCase().includes(term.toLowerCase())
    || user.fullName.toLowerCase().includes(term.toLowerCase())
    || user.role.toLowerCase().includes(term.toLowerCase());
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // tslint:disable-next-line:variable-name
  private _loading$ = new BehaviorSubject<boolean>(true);
  // tslint:disable-next-line:variable-name
  private _search$ = new Subject<void>();
  // tslint:disable-next-line:variable-name
  private _users$ = new BehaviorSubject<User[]>([]);
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
      this._users$.next(result.users);
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

  get users$() {
    return this._users$.asObservable();
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
    return this.apiService.get('/users').pipe(
      map(
        usersMap => ({
          users: usersMap.filter(
            user => matches(user, searchTerm, this.pipe)
          ).slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize), total: usersMap.length
        } as SearchResult)
      )
    );
  }

  getById(id: number) {
    return this.apiService.get(`/users/${id}`);
  }

  createUser(credentials: Credentials) {
    return this.apiService.post('/users', credentials);
  }

  updateUser(id: number, info: UserUpdateInfo) {
    return this.apiService.put(`/users/${id}`, info);
  }
}
