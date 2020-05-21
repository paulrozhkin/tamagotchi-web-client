import {Component, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FilesService} from '../core/services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2, config: NgbModalConfig,
              private filesService: FilesService, private modalService: NgbModal) {
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
    return this.filesService.getReleaseClientUrl()
  }

  getStaffApkUrl() {
    return this.filesService.getReleaseStaffUrl()
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, this.bodyMainClass);
  }
}
