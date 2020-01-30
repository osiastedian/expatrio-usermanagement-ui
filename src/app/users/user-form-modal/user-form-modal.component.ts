import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss']
})
export class UserFormModalComponent implements OnInit {
  title = 'Create User';
  closeBtnName = 'Create';
  showPassword = false;

  user: User;

  constructor(public modalRef: BsModalRef) {}

  ngOnInit() {
    if (!this.user) {
      this.user = this.getDefaultUserDetails();
    }
  }

  private getDefaultUserDetails(): User {
    return {
      firstName: '',
      lastName: '',
      password: '',
      userName: '',
      role: null
    };
  }

  createUser() {
    this.modalRef.hide();
  }
}
