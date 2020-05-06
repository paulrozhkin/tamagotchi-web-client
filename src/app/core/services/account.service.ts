import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {JwtService} from './jwt.service';
import {Credentials, User} from '../models';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {Md5} from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private jwtService: JwtService, private apiService: ApiService) {
  }

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.
  populate() {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      const token = this.jwtService.getToken();

      this.apiService.get('/account')
        .subscribe(
          data => {
            this.setAuth({...data, token});
          },
          err => {
            this.purgeAuth();
          }
        );
    } else {
      // Remove any potential remnants of previous auth states
      this.purgeAuth();
    }
  }

  private setAuth(user: { user: User, token: string }) {
    // Save JWT sent from server in localstorage
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user.user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  private purgeAuth() {
    // Remove JWT from localstorage
    this.jwtService.destroyToken();
    // Set current user to an empty object
    this.currentUserSubject.next({} as User);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
  }

  /**
   * Logout from system.
   */
  logOut() {
    this.purgeAuth();
  }

  /**
   * Authentication user.
   * @param credentials login and password.
   * @return user data.
   */
  logIn(credentials: Credentials): Observable<User> {
    credentials.password = (Md5.hashStr(credentials.password) as string);

    return this.apiService.post(`/authenticate`, credentials)
      .pipe(map(
        data => {
          this.setAuth(data);
          return data;
        }
      ));
  }

  getAccount(): User {
    return this.currentUserSubject.value;
  }
}
