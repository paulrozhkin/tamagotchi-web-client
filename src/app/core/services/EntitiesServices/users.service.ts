import {Injectable, PipeTransform} from '@angular/core';
import {
  Credentials,
  SearchResultPagination,
  User,
  UserUpdateInfo
} from '../../models';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BaseEntityService} from './base-entity.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseEntityService<User> {

  protected matches(user: User, term: string): boolean {
    return user.login.toLowerCase().includes(term.toLowerCase())
      || user.fullName?.toLowerCase().includes(term.toLowerCase())
      || user.role.toLowerCase().includes(term.toLowerCase());
  }


  protected search(): Observable<SearchResultPagination<User>> {
    return this.getAll('/users');
  }

  getById(id: number) {
    return this.apiService.get(`/users/${id}`);
  }

  createUser(credentials: Credentials) {
    return this.apiService.post('/users', credentials);
  }

  updateUser(id: number, info: UserUpdateInfo) {
    return this.apiService.put(`/users/${id}`, info);
  }
}
