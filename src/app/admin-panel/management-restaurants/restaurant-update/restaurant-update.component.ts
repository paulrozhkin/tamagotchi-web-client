import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FileInfo, Restaurant, RestaurantUpdateInfo} from '../../../core/models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiService, RestaurantsService} from '../../../core/services';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-restaurant-update',
  templateUrl: './restaurant-update.component.html',
  styleUrls: ['./restaurant-update.component.css']
})
export class RestaurantUpdateComponent implements OnInit {

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
              private restaurantsService: RestaurantsService, private httpClient: HttpClient) {
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


  getPathToImage(imageId: number) {
    return `${environment.api_url}/files/${imageId}`;
  }

  onFileChanged(files: FileList) {
    const selectedFile = files[0];

    const uploadData = new FormData();
    uploadData.append('file', selectedFile, selectedFile.name);

    this.httpClient.post(`${environment.api_url}/files`, uploadData, {headers: {'IS-FILE': 'isFile'}})
      .subscribe(newFile => {
        const fileInfo = newFile as FileInfo;
        if (fileInfo) {
          this.restaurant.photos.push(fileInfo.id);
        }
      });
  }

  deleteImage(photoId: number) {
    this.restaurant.photos = this.restaurant.photos.filter(item => item !== photoId);
  }
}
