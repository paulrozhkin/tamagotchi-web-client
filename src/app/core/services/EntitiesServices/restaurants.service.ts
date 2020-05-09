import {Injectable, PipeTransform} from '@angular/core';
import {Restaurant, RestaurantCreateInfo, RestaurantUpdateInfo, SearchResultPagination, StatePagination} from '../../models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseEntityService} from './base-entity.service';


@Injectable({
  providedIn: 'root'
})
export class RestaurantsService extends BaseEntityService<Restaurant> {

  protected matches(restaurant: Restaurant, term: string): boolean {
    return restaurant.address.toLowerCase().includes(term.toLowerCase())
      || restaurant.positionLatitude.toString().includes(term)
      || restaurant.positionLongitude.toString().includes(term);
  }

  protected search(): Observable<SearchResultPagination<Restaurant>> {
    return this.getAll('/restaurants');
  }

  createRestaurant(info: RestaurantCreateInfo) {
    return this.apiService.post('/restaurants', info);
  }

  updateRestaurant(id: number, info: RestaurantUpdateInfo) {
    return this.apiService.put(`/restaurants/${id}`, info);
  }

  getById(id: number) {
    return this.apiService.get(`/restaurants/${id}`);
  }
}
