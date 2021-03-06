import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountService, JwtService} from '../services';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(private jwtService: JwtService, private accountService: AccountService, private router: Router) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isFileKey = request.headers.get('IS-FILE');

    // TODO: очень сильный костыль на то, чтобы загружать файлы. Надо что то с этим делать.
    let headersConfig = {};
    if (!isFileKey) {
      headersConfig = {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      };
    } else {
      headersConfig = {
        Accept: '*/*'
      };
    }

    const token = this.jwtService.getToken();

    if (token) {
      const authData = {
        Authorization: `Bearer ${token}`
      };
      headersConfig = {...headersConfig, ...authData};
    }

    const requestWithToken = request.clone({setHeaders: headersConfig});
    return next.handle(requestWithToken).pipe(tap(() => {

    }, error => {
      if (error.status === 401) {
        this.accountService.logOut();
        this.router.navigateByUrl('/');
      }
    }));
  }
}
