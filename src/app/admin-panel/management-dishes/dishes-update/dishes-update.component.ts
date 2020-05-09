import {Component, Input, OnInit} from '@angular/core';
import {Restaurant, RestaurantUpdateInfo} from '../../../core/models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder} from '@angular/forms';
import {FilesService, RestaurantsService} from '../../../core/services';

@Component({
  selector: 'app-dishes-update',
  templateUrl: './dishes-update.component.html',
  styleUrls: ['./dishes-update.component.css']
})
export class DishesUpdateComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _restaurant: Restaurant;

  restaurantUpdateForm = this.fb.group(
    {
      isParkingPresent: [false],
      isCardPaymentPresent: [false],
      isWifiPresent: [false],
      isDeleted: [false],
      photos: []
    }
  );

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private restaurantsService: RestaurantsService, public filesService: FilesService) {
  }

  ngOnInit(): void {
  }

  get restaurant() {
    return this._restaurant;
  }

  @Input() set restaurant(value: Restaurant) {
    this._restaurant = value;

    this._restaurant.isParkingPresent = this._restaurant.isParkingPresent ? this._restaurant.isParkingPresent : false;
    this._restaurant.isCardPaymentPresent = this._restaurant.isCardPaymentPresent ? this._restaurant.isCardPaymentPresent : false;
    this._restaurant.isWifiPresent = this._restaurant.isWifiPresent ? this._restaurant.isWifiPresent : false;
    this._restaurant.isDeleted = this._restaurant.isDeleted ? this._restaurant.isDeleted : false;
    this._restaurant.photos = this._restaurant.photos ? this._restaurant.photos : [];

    this.restaurantUpdateForm.setValue({
      isParkingPresent: this._restaurant.isParkingPresent,
      isCardPaymentPresent: this._restaurant.isCardPaymentPresent,
      isWifiPresent: this._restaurant.isWifiPresent,
      isDeleted: this._restaurant.isDeleted,
      photos: this._restaurant.photos
    });
  }

  onSubmit() {
    const info: RestaurantUpdateInfo = {
      isCardPaymentPresent: this.restaurantUpdateForm.get('isCardPaymentPresent').value,
      isDeleted: this.restaurantUpdateForm.get('isDeleted').value,
      isParkingPresent: this.restaurantUpdateForm.get('isParkingPresent').value,
      isWifiPresent: this.restaurantUpdateForm.get('isWifiPresent').value,
      photos: this.restaurant.photos
    };

    this.restaurantsService.updateRestaurant(this.restaurant.id, info).subscribe(restaurant => {
      this.activeModal.close('Updated');
    }, error => {
      // TODO: надо что то показывать пользователю.
    });
  }

  onFileChanged(files: FileList) {
    const selectedFile = files[0];

    this.filesService.fileUpload(selectedFile).subscribe(newFileId => this.restaurant.photos.push(newFileId),
      error => {
        // TODO: ошибка, что файл не был загружен.
      });
  }

  deleteImage(photoId: number) {
    this.restaurant.photos = this.restaurant.photos.filter(item => item !== photoId);
  }
}
