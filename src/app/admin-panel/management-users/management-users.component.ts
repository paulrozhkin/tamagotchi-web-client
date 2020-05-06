import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../core/models';
import {FilesService, UsersService} from '../../core/services';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserUpdateComponent} from './user-update/user-update.component';

@Component({
  selector: 'app-users',
  templateUrl: './management-users.component.html',
  styleUrls: ['./management-users.component.css']
})
export class ManagementUsersComponent implements OnInit {

  users$: Observable<User[]>;
  total$: Observable<number>;

  constructor(public service: UsersService, private modalService: NgbModal, public filesService: FilesService) {
    this.users$ = this.service.users$;
    this.total$ = service.total$;
  }

  ngOnInit(): void {
  }

  createUser() {
    this.modalService.open(UserCreateComponent).result.then(result => {
      this.service.refresh();
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }

  onEdit(id: number) {
    this.service.getById(id).subscribe(userInfo => {
      const modalEdit = this.modalService.open(UserUpdateComponent);
      modalEdit.componentInstance.user = userInfo;
      modalEdit.result.then(() => this.service.refresh());
    }, error => {
      // TODO: отобразить пользователю ошибку
    });
  }

}
