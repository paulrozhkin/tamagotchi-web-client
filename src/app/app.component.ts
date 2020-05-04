import {Component, OnInit, Renderer2} from '@angular/core';
import * as AOS from 'aos';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tamagotchi-web-client';
  previousUrl: string;
  // adminPanelClass = 'hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed';
  // adminPanelClasses = [ 'hold-transition', 'sidebar-mini', 'layout-fixed', 'layout-navbar-fixed', 'layout-footer-fixed' ];

  constructor(private renderer: Renderer2, private router: Router) {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {

          // const currentUrlSlug = event.url.slice(1);
          // switch (currentUrlSlug) {
          //   case '':
          //     // this.renderer.removeClass(document.body, this.adminPanelClass);
          //     this.adminPanelClasses.forEach(adminBodyClass => this.renderer.removeClass(document.body, adminBodyClass));
          //     this.renderer.addClass(document.body, 'body-main');
          //     break;
          //   case 'admin':
          //     this.adminPanelClasses.forEach(adminBodyClass => this.renderer.addClass(document.body, adminBodyClass));
          //     // this.renderer.addClass(document.body, adminPanelClasses);
          //     this.renderer.removeClass(document.body, 'body-main');
          //     break;
          // }

          // this.previousUrl = currentUrlSlug;
        }
      });
  }

  ngOnInit(): void {
    AOS.init();
  }
}
