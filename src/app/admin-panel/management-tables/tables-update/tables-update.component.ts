import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestaurantsService} from '../../../core/services';
import {Dish, MenuItem, MenuItemUpdateInfo, RestaurantTable, RestaurantTableUpdatableInfo} from '../../../core/models';

@Component({
  selector: 'app-tables-update',
  templateUrl: './tables-update.component.html',
  styleUrls: ['./tables-update.component.css']
})
export class TablesUpdateComponent implements OnInit {

  @Input()
  public restaurantId: number;

  // tslint:disable-next-line:variable-name
  public _table: RestaurantTable;

  get table(): RestaurantTable {
    return this._table;
  }

  @Input()
  set table(value: RestaurantTable) {
    this._table = value;

    this.menuItemCreateForm = this.fb.group(
      {
        name: [this._table.name, Validators.required],
        numberOfPlaces: [this._table.numberOfPlaces, Validators.required],
        description: [this._table.description],
        isDeleted: [this._table.isDeleted]
      }
    );
  }

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private restaurantsService: RestaurantsService) {
  }

  get name() {
    return this.menuItemCreateForm.get('name');
  }

  get numberOfPlaces() {
    return this.menuItemCreateForm.get('numberOfPlaces');
  }

  get description() {
    return this.menuItemCreateForm.get('description');
  }

  get isDeleted() {
    return this.menuItemCreateForm.get('isDeleted');
  }

  menuItemCreateForm: FormGroup;

  ngOnInit(): void {
  }

  onSubmit() {
    const updateInfo: RestaurantTableUpdatableInfo = {
      description: this.description.value,
      isDeleted: this.isDeleted.value,
      name: this.name.value,
      numberOfPlaces: this.numberOfPlaces.value,
      photos: this._table.photos
    };

    this.restaurantsService.updateRestaurantTable(this.restaurantId, this.table.id, updateInfo).subscribe(info => {
      this.activeModal.close('Updated');
    }, error => {
      // TODO: надо что то показывать пользователю.
    });
  }
}
