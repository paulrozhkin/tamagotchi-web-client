import {Component, OnInit} from '@angular/core';
import * as AOS from 'aos';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'tamagotchi-web-client';

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    AOS.init();
  }


  open(content) {
    this.modalService.open(content);
  }

  downloadApkUrl() {
    return 'http://316825-blackiiifox.tmweb.ru:3000/api/files/0';
  }
}
