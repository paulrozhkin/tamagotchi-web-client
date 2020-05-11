import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantsService} from '../../../core/services';
import {Dish, MenuItem, MenuItemUpdateInfo} from '../../../core/models';

@Component({
  selector: 'app-menu-item-update',
  templateUrl: './menu-item-update.component.html',
  styleUrls: ['./menu-item-update.component.css']
})
export class MenuItemUpdateComponent implements OnInit {

  @Input()
  public restaurantId: number;

  // tslint:disable-next-line:variable-name
  public _menuItem: MenuItem;

  get menuItem(): MenuItem {
    return this._menuItem;
  }

  @Input()
  set menuItem(value: MenuItem) {
    this._menuItem = value;

    this.menuItemCreateForm = this.fb.group(
      {
        price: [this.menuItem.price, Validators.required],
        isDeleted: [this.menuItem.isDeleted]
      }
    );
  }

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private restaurantsService: RestaurantsService) {
  }

  get price() {
    return this.menuItemCreateForm.get('price');
  }

  get isDeleted() {
    return this.menuItemCreateForm.get('isDeleted');
  }

  menuItemCreateForm: FormGroup;

  ngOnInit(): void {
  }

  onSubmit() {
    const updateInfo: MenuItemUpdateInfo = {
      dish: undefined,
      isDeleted: this.isDeleted.value,
      price: this.price.value
    };

    this.restaurantsService.updateRestaurantMenu(this.restaurantId, this.menuItem.id, updateInfo).subscribe(info => {
      this.activeModal.close('Updated');
    }, error => {
      // TODO: надо что то показывать пользователю.
    });
  }
}
