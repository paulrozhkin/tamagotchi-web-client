import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RestaurantsService} from '../../../core/services';
import {RestaurantCreateInfo} from '../../../core/models';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.css']
})
export class RestaurantCreateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private restaurantsService: RestaurantsService) {
  }

  get address() {
    return this.restaurantCreateForm.get('address');
  }

  get latitude() {
    return this.restaurantCreateForm.get('latitude');
  }

  get longitude() {
    return this.restaurantCreateForm.get('longitude');
  }

  restaurantCreateForm = this.fb.group(
    {
      address: ['', Validators.required],
      latitude: ['', [Validators.required, Validators.min(0), Validators.max(180)]],
      longitude: ['', [Validators.required, Validators.min(0), Validators.max(180)]]
    }
  );

  ngOnInit(): void {
  }

  onSubmit() {
    const createInfo: RestaurantCreateInfo = {
      address: this.address.value,
      positionLatitude: this.latitude.value,
      positionLongitude: this.longitude.value
    };

    this.restaurantsService.createRestaurant(createInfo).subscribe(restaurant => {
      this.activeModal.close('Created');
    }, error => {
      // TODO: надо что то показывать пользователю.
    });
  }
}
