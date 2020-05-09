import {Component, OnInit} from '@angular/core';
import {RestaurantsService} from '../../core/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DishesService} from '../../core/services';
import {Observable} from 'rxjs';
import {Dish} from '../../core/models';

@Component({
  selector: 'app-dishes',
  templateUrl: './management-dishes.component.html',
  styleUrls: ['./management-dishes.component.css']
})
export class ManagementDishesComponent implements OnInit {

  dishes$: Observable<Dish[]>;
  total$: Observable<number>;

  constructor(public service: DishesService, private modalService: NgbModal) {
    // this.dishes$ = service.dishes$;
    // this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

}
