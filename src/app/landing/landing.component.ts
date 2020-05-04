import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2, config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;

  }
  public pageRoute = '/welcome';

  public isMenuCollapsed = true;
  private bodyMainClass = 'body-main';

  ngOnInit(): void {
    this.renderer.addClass(document.body, this.bodyMainClass);
  }

  open(content) {
    this.modalService.open(content);
  }

  getClientApkUrl() {
    return 'http://316825-blackiiifox.tmweb.ru:3000/api/files/0';
  }

  getStaffApkUrl() {
    return '#';
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, this.bodyMainClass);
  }
}
