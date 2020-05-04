import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RestaurantsService} from '../../core/services';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import {Restaurant} from '../../core/models';

@Component({
  selector: 'app-restaurants',
  templateUrl: './management-restaurants.component.html',
  styleUrls: ['./management-restaurants.component.css'],
  providers: [RestaurantsService, DecimalPipe]
})
export class ManagementRestaurantsComponent implements OnInit {

  restaurants$: Observable<Restaurant[]>;
  total$: Observable<number>;

  constructor(public service: RestaurantsService) {
    this.restaurants$ = service.restaurants$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }
}
