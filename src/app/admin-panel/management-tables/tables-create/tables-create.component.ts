import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DishesService, RestaurantsService, UsersService} from '../../../core/services';
import {Credentials, Dish, MenuItemUpdateInfo, RestaurantCreateInfo, RestaurantTableCreateInfo} from '../../../core/models';
import {DecimalPipe} from '@angular/common';
import {Md5} from 'ts-md5';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-tables-create',
  templateUrl: './tables-create.component.html',
  styleUrls: ['./tables-create.component.css']
})
export class TablesCreateComponent implements OnInit {


  @Input()
  public restaurantId: number;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private restaurantsService: RestaurantsService) {
  }

  get name() {
    return this.tableCreateForm.get('name');
  }

  get numberOfPlaces() {
    return this.tableCreateForm.get('numberOfPlaces');
  }

  tableCreateForm = this.fb.group(
    {
      name: ['', Validators.required],
      numberOfPlaces: ['', Validators.required]
    }
  );

  ngOnInit(): void {
  }

  onSubmit() {
    const createInfo: RestaurantTableCreateInfo = {
      name: this.name.value,
      numberOfPlaces: this.numberOfPlaces.value
    };

    this.restaurantsService.addRestaurantTable(this.restaurantId, createInfo).subscribe(() => {
      this.activeModal.close('Created');
    }, () => {
      // TODO: надо что то показывать пользователю.
    });
  }
}
