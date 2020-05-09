import {Injectable, PipeTransform} from '@angular/core';
import {BaseEntityService} from './base-entity.service';
import {Dish, SearchResultPagination} from '../../models';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService extends BaseEntityService<Dish>{
  protected matches(restaurant: Dish, term: string): boolean {
    return true;
  }

  protected search(): Observable<SearchResultPagination<Dish>> {
    return this.getAll('/dishes');
  }
}
