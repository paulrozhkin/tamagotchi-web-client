import {Component, OnInit} from '@angular/core';
import {DishesService, RestaurantsService} from '../../core/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {Dish, MenuItem, Restaurant} from '../../core/models';
import {UserCreateComponent} from '../management-users/user-create/user-create.component';
import {MenuItemCreateComponent} from './menu-item-create/menu-item-create.component';
import {DishesUpdateComponent} from '../management-dishes/dishes-update/dishes-update.component';
import {MenuItemUpdateComponent} from './menu-item-update/menu-item-update.component';

@Component({
  selector: 'app-menu',
  templateUrl: './management-menu.component.html',
  styleUrls: ['./management-menu.component.css']
})
export class ManagementMenuComponent implements OnInit {

  menu$: Observable<MenuItem[]>;
  total$: Observable<number>;
  restaurants$: Observable<Restaurant[]>;
  // tslint:disable-next-line:variable-name
  _selectedRestaurant: Restaurant;

  constructor(private restaurantsService: RestaurantsService,
              private modalService: NgbModal) {
    this.restaurants$ = restaurantsService.entities$;
  }

  ngOnInit(): void {
  }

  get selectedRestaurant() {
    return this._selectedRestaurant;
  }

  set selectedRestaurant(value) {
    this._selectedRestaurant = value;

    this.menu$ = this.restaurantsService.getRestaurantMenu(this._selectedRestaurant.id);
  }

  createMenuItem() {
    const modalCreate = this.modalService.open(MenuItemCreateComponent);
    modalCreate.componentInstance.restaurantId = this.selectedRestaurant.id;

    modalCreate.result.then(result => {
      this.menu$ = null;
      this.menu$ = this.restaurantsService.getRestaurantMenu(this._selectedRestaurant.id);
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }

  onEditMenuItem(menuItemId: number) {
    this.restaurantsService.getRestaurantMenuItem(this.selectedRestaurant.id, menuItemId).subscribe(menuItemInfo => {
      const modalEdit = this.modalService.open(MenuItemUpdateComponent);
      modalEdit.componentInstance.restaurantId = this.selectedRestaurant.id;
      modalEdit.componentInstance.menuItem = menuItemInfo;
      modalEdit.result.then(() => {
        this.menu$ = null;
        this.menu$ = this.restaurantsService.getRestaurantMenu(this._selectedRestaurant.id);
      });
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }
}
