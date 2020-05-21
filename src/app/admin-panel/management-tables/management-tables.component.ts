import {Component, OnInit} from '@angular/core';
import {RestaurantsService} from '../../core/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';
import {TablesCreateComponent} from './tables-create/tables-create.component';
import {TablesUpdateComponent} from './tables-update/tables-update.component';
import {Restaurant, RestaurantTable} from '../../core/models';

@Component({
  selector: 'app-tables',
  templateUrl: './management-tables.component.html',
  styleUrls: ['./management-tables.component.css']
})
export class ManagementTablesComponent implements OnInit {

  tables$: Observable<RestaurantTable[]>;
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

    this.tables$ = this.restaurantsService.getRestaurantTables(this._selectedRestaurant.id);
  }

  createMenuItem() {
    const modalCreate = this.modalService.open(TablesCreateComponent);
    modalCreate.componentInstance.restaurantId = this.selectedRestaurant.id;

    modalCreate.result.then(result => {
      this.tables$ = null;
      this.tables$ = this.restaurantsService.getRestaurantTables(this._selectedRestaurant.id);
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }

  onEditMenuItem(tableId: number) {
    this.restaurantsService.getRestaurantTableById(this.selectedRestaurant.id, tableId).subscribe(tableInfo => {
      const modalEdit = this.modalService.open(TablesUpdateComponent);
      modalEdit.componentInstance.restaurantId = this.selectedRestaurant.id;
      modalEdit.componentInstance.table = tableInfo;
      modalEdit.result.then(() => {
        this.tables$ = null;
        this.tables$ = this.restaurantsService.getRestaurantTables(this._selectedRestaurant.id);
      });
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }
}
