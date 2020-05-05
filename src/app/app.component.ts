import {Component, OnInit, Renderer2} from '@angular/core';
import * as AOS from 'aos';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {NavigationStart, Router} from '@angular/router';
import {AccountService} from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tamagotchi';

  constructor(private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.accountService.populate();
    AOS.init();
  }
}
