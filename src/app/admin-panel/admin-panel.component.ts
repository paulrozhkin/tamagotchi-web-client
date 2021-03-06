import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {AccountService} from '../core/services';
import {User} from '../core/models';
import {Subject} from 'rxjs';

declare function adminLteStart(): any;

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  adminPanelClasses = ['hold-transition', 'sidebar-mini', 'layout-fixed', 'layout-navbar-fixed', 'layout-footer-fixed'];

  public pageRoute = '/admin';

  public currentUser: User;

  constructor(private renderer: Renderer2, public router: Router, private accountService: AccountService) {
    accountService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit(): void {
    this.adminPanelClasses.forEach(adminBodyClass => this.renderer.addClass(document.body, adminBodyClass));
    // TODO: It's not a fix.
    adminLteStart();
  }

  ngOnDestroy(): void {
    this.adminPanelClasses.forEach(adminBodyClass => this.renderer.removeClass(document.body, adminBodyClass));
  }

  logout() {
    this.accountService.logOut();
    this.router.navigateByUrl('/');
  }
}
