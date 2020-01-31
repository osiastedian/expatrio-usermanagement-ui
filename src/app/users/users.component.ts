import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';
import { User } from '../models';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { AddUser } from '../actions/users.action';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {}

  createNewUser() {
    const modalRef = this.modalService.show(UserFormModalComponent);

    const subscription = this.modalService.onHide.subscribe(() => {
      const content: UserFormModalComponent = modalRef.content;
      if (!content.success) {
        return;
      }
      const { user } = content;
      this.store.dispatch(new AddUser({ user }));
      subscription.unsubscribe();
    });
  }
}
