import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild} from '@angular/router';
import {Observable, of} from 'rxjs';
import {AccountService} from './account.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private accountService: AccountService, private router: Router) {
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  private checkLogin() {
    return this.accountService.isAuthenticated.pipe(map(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/login']);
      }

      // this.router.navigate(['/admin']);
      return isAuth;
    }, err => {
      this.router.navigate(['/login']);
      of(false);
    }));

    // return this.accountService.currentUser.map(e => {
    //   return e;
    // }).catch(() => {
    //   this.router.navigate(['/login']);
    //   return of(false);
    // });
  }
}
