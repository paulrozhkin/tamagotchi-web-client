import {Component, OnInit} from '@angular/core';
import {RestaurantsService} from '../../core/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DishesService} from '../../core/services';
import {Observable} from 'rxjs';
import {Dish} from '../../core/models';
import {UserCreateComponent} from '../management-users/user-create/user-create.component';
import {DishesCreateComponent} from './dishes-create/dishes-create.component';
import {UserUpdateComponent} from '../management-users/user-update/user-update.component';
import {DishesUpdateComponent} from './dishes-update/dishes-update.component';

@Component({
  selector: 'app-dishes',
  templateUrl: './management-dishes.component.html',
  styleUrls: ['./management-dishes.component.css']
})
export class ManagementDishesComponent implements OnInit {

  dishes$: Observable<Dish[]>;
  total$: Observable<number>;

  constructor(public service: DishesService, private modalService: NgbModal) {
    this.dishes$ = service.entities$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  createDish() {
    this.modalService.open(DishesCreateComponent).result.then(result => {
      this.service.refresh();
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }

  onEdit(id: number) {
    this.service.getById(id).subscribe(dishInfo => {
      const modalEdit = this.modalService.open(DishesUpdateComponent);
      modalEdit.componentInstance.dish = dishInfo;
      modalEdit.result.then(() => this.service.refresh());
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }
}
