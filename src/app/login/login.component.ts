import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {AccountService} from '../core/services';
import {Credentials} from '../core/models';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginClasses = ['hold-transition', 'login-page'];

  model: Credentials = {
    login: '',
    password: ''
  };

  public isLoginProgress: boolean;
  public isErrorLogin: boolean;

  constructor(private renderer: Renderer2, private accountService: AccountService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginClasses.forEach(adminBodyClass => this.renderer.addClass(document.body, adminBodyClass));
  }

  ngOnDestroy(): void {
    this.loginClasses.forEach(adminBodyClass => this.renderer.removeClass(document.body, adminBodyClass));
  }

  onSubmit() {
    this.isLoginProgress = true;
    this.isErrorLogin = false;

    const credentials: Credentials = {
      login: this.model.login,
      password: this.model.password
    };

    this.accountService.logIn(credentials).subscribe(
      result => {
        this.isLoginProgress = false;
        this.router.navigate(['/welcome']);
      }, error => {
        this.isLoginProgress = false;
        this.isErrorLogin = true;
      }
    );
    // this.accountService.attemptAuth()
  }

}
