import {Injectable, PipeTransform} from '@angular/core';
import {BaseEntityService} from './base-entity.service';
import {Credentials, Dish, DishUpdatedInfo, SearchResultPagination, UserUpdateInfo} from '../../models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService extends BaseEntityService<Dish> {
  protected matches(dish: Dish, term: string): boolean {
    return dish.id.toString().includes(term)
      || dish.name?.toLowerCase().includes(term.toLowerCase())
      || dish.description?.toLowerCase().includes(term.toLowerCase());
  }

  protected search(): Observable<SearchResultPagination<Dish>> {
    return this.getAll('/dishes');
  }

  getById(id: number) {
    return this.apiService.get(`/dishes/${id}`);
  }

  createDish(dish: DishUpdatedInfo) {
    return this.apiService.post('/dishes', dish);
  }

  updateDish(id: number, info: DishUpdatedInfo) {
    return this.apiService.put(`/dishes/${id}`, info);
  }
}
