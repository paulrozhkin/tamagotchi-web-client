import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
declare function adminLteStart(): any; // just change here from arun answer.

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit, OnDestroy {

  adminPanelClasses = ['hold-transition', 'sidebar-mini', 'layout-fixed', 'layout-navbar-fixed', 'layout-footer-fixed'];

  public pageRoute = '/admin';

  constructor(private renderer: Renderer2, public router: Router) {
  }

  ngOnInit(): void {
    this.adminPanelClasses.forEach(adminBodyClass => this.renderer.addClass(document.body, adminBodyClass));
    // TODO: It's not a fix.
    adminLteStart();
  }

  ngOnDestroy(): void {
    this.adminPanelClasses.forEach(adminBodyClass => this.renderer.removeClass(document.body, adminBodyClass));
  }

}
