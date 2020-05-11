import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DishesService, RestaurantsService, UsersService} from '../../../core/services';
import {Credentials, Dish, MenuItemUpdateInfo, RestaurantCreateInfo} from '../../../core/models';
import {DecimalPipe} from '@angular/common';
import {Md5} from 'ts-md5';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-menu-item-create',
  templateUrl: './menu-item-create.component.html',
  styleUrls: ['./menu-item-create.component.css']
})
export class MenuItemCreateComponent implements OnInit {

  public dishes$: Observable<Dish[]>;
  // tslint:disable-next-line:variable-name
  private _selectedDish: Dish;

  @Input()
  public restaurantId: number;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private dishesService: DishesService,
              private restaurantsService: RestaurantsService) {
    this.dishes$ = dishesService.entities$;
  }

  set selectedDish(value: Dish) {
    this._selectedDish = value;
  }

  get selectedDish(): Dish {
    return this._selectedDish;
  }

  get price() {
    return this.menuItemCreateForm.get('price');
  }

  get dish() {
    return this.menuItemCreateForm.get('dish');
  }

  menuItemCreateForm = this.fb.group(
    {
      price: ['', Validators.required],
      dish: ['', Validators.required]
    }
  );

  ngOnInit(): void {
  }

  onSubmit() {
    const createInfo: MenuItemUpdateInfo = {
      dish: this.dish.value.id,
      isDeleted: undefined,
      price: this.price.value
    };

    this.restaurantsService.addRestaurantMenu(this.restaurantId, createInfo).subscribe(() => {
      this.activeModal.close('Created');
    }, () => {
      // TODO: надо что то показывать пользователю.
    });

    // const createInfo: Credentials = {
    //   login: this.login.value,
    //   password: (Md5.hashStr(this.password.value) as string)
    // };
    //
    // this.usersService.createUser(createInfo).subscribe(() => {
    //   this.activeModal.close('Created');
    // }, () => {
    //   // TODO: надо что то показывать пользователю.
    // });
  }
}
