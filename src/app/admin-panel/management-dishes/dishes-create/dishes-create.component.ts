import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DishesService, RestaurantsService} from '../../../core/services';
import {Dish, DishUpdatedInfo, RestaurantCreateInfo} from '../../../core/models';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-dishes-create',
  templateUrl: './dishes-create.component.html',
  styleUrls: ['./dishes-create.component.css']
})
export class DishesCreateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private dishesService: DishesService) {
  }

  get name() {
    return this.dishCreateForm.get('name');
  }

  dishCreateForm = this.fb.group(
    {
      name: ['', Validators.required]
    }
  );

  ngOnInit(): void {
  }

  onSubmit() {
    const createInfo: DishUpdatedInfo = {
      description: null,
      photos: null,
      name: this.name.value
    };

    this.dishesService.createDish(createInfo).subscribe(restaurant => {
      this.activeModal.close('Created');
    }, error => {
      // TODO: надо что то показывать пользователю.
    });
  }
}
