import {Component, Input, OnInit} from '@angular/core';
import {Dish, DishUpdatedInfo, Restaurant, RestaurantUpdateInfo} from '../../../core/models';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {DishesService, FilesService, RestaurantsService} from '../../../core/services';

@Component({
  selector: 'app-dishes-update',
  templateUrl: './dishes-update.component.html',
  styleUrls: ['./dishes-update.component.css']
})
export class DishesUpdateComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  _dish: Dish;

  dishUpdateForm = this.fb.group(
    {
      name: ['', Validators.required],
      description: '',
      photos: []
    }
  );

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder,
              private restaurantsService: RestaurantsService, private dishesService: DishesService,
              public filesService: FilesService) {
  }

  ngOnInit(): void {
  }

  get dish() {
    return this._dish;
  }

  @Input() set dish(value: Dish) {
    this._dish = value;

    this.dishUpdateForm.setValue({
      name: this._dish.name,
      description: this._dish.description,
      photos: this._dish.photos
    });
  }

  onSubmit() {
    const info: DishUpdatedInfo = {
      name: this.dishUpdateForm.get('name').value,
      description: this.dishUpdateForm.get('description').value,
      photos: this.dish.photos
    };

    this.dishesService.updateDish(this.dish.id, info).subscribe(restaurant => {
      this.activeModal.close('Updated');
    }, error => {
      // TODO: надо что то показывать пользователю.
    });
  }

  onFileChanged(files: FileList) {
    const selectedFile = files[0];

    if (this.dish.photos === undefined || this.dish.photos === null) {
      this.dish.photos = [];
    }

    this.filesService.fileUpload(selectedFile).subscribe(newFileId => this.dish.photos.push(newFileId),
      error => {
        // TODO: ошибка, что файл не был загружен.
      });
  }

  deleteImage(photoId: number) {
    this.dish.photos = this.dish.photos.filter(item => item !== photoId);
  }
}
