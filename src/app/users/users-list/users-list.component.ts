import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserFormModalComponent } from '../user-form-modal/user-form-modal.component';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { LoadPage, DeleteUser, EditUser } from 'src/app/actions/users.action';
import { Observable } from 'rxjs';
import { UsersSelectors } from 'src/app/selectors/users.selector';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: Observable<User[]>;

  currentPage = 0;
  pageSize = 10;

  constructor(
    private modalService: BsModalService,
    private store: Store<AppState>,
    private selectors: UsersSelectors
  ) {}

  ngOnInit() {
    this.store.dispatch(
      new LoadPage({
        page: {
          pageNumber: 0,
          pageSize: 10
        }
      })
    );
    this.users = this.store.pipe(select(this.selectors.displayedUsers));
    this.store.pipe(select(this.selectors.currentPage)).subscribe(page => {
      this.currentPage = page;
    });
  }

  editUser(user: User) {
    const modalRef = this.modalService.show(UserFormModalComponent);
    const content: UserFormModalComponent = modalRef.content;
    content.user = { ...user };
    content.closeBtnName = 'Save';
    content.title = 'Update User';
    content.isNew = false;
    this.modalService.onHidden.subscribe(data => {
      const updateUser = content.user;
      this.store.dispatch(new EditUser({ user: updateUser }));
    });
  }

  deleteUser(userId: string) {
    this.store.dispatch(new DeleteUser({ userId }));
  }
}
