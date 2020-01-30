import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserFormModalComponent } from './user-form-modal/user-form-modal.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule } from '@angular/forms';
import { UsersListComponent } from './users-list/users-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [UsersComponent, UserFormModalComponent, UsersListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ButtonsModule,
    ModalModule.forRoot(),
    FormsModule,
    PaginationModule.forRoot(),
    PopoverModule.forRoot()
  ],
  entryComponents: [UserFormModalComponent]
})
export class UsersModule {}
