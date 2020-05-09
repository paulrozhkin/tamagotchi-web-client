import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {RestaurantsService} from '../../core/services';
import {Observable} from 'rxjs';
import {Restaurant} from '../../core/models';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RestaurantCreateComponent} from './restaurant-create/restaurant-create.component';
import {RestaurantUpdateComponent} from './restaurant-update/restaurant-update.component';

@Component({
  selector: 'app-restaurants',
  templateUrl: './management-restaurants.component.html',
  styleUrls: ['./management-restaurants.component.css']
})
export class ManagementRestaurantsComponent implements OnInit {

  restaurants$: Observable<Restaurant[]>;
  total$: Observable<number>;

  constructor(public service: RestaurantsService, private modalService: NgbModal) {
    this.restaurants$ = service.entities$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  createRestaurant() {
    this.modalService.open(RestaurantCreateComponent).result.then(result => {
      this.service.refresh();
    });
  }

  onEdit(id: number) {
    this.service.getById(id).subscribe(restaurantInfo => {
      const modalEdit = this.modalService.open(RestaurantUpdateComponent);
      modalEdit.componentInstance.restaurant = restaurantInfo;
      modalEdit.result.then(() => this.service.refresh());
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }
}
