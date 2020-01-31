import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models';
import { UserRole } from 'src/app/models/user-role.enum';

@Component({
  selector: 'app-user-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrls: ['./user-form-modal.component.scss']
})
export class UserFormModalComponent implements OnInit {
  isNew = true;
  title = 'Create User';
  closeBtnName = 'Create';
  showPassword = false;
  success = false;
  user: User;

  readonly rolesOptions = [
    {
      text: 'Admin',
      value: UserRole.ADMIN
    },
    {
      text: 'Customer',
      value: UserRole.CUSTOMER
    },
    {
      text: 'None',
      value: UserRole.NO_ACCESS
    }
  ];

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
      role: UserRole.NO_ACCESS
    };
  }

  save() {
    this.success = true;
    this.modalRef.hide();
  }
}
