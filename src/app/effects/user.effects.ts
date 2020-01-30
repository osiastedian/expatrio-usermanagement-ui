import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, act } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';
import { Action, Store, select } from '@ngrx/store';
import {
  UserActionType,
  LoadPage,
  SetUserPage,
  AddUser,
  DeleteUser,
  EditUser
} from '../actions/users.action';
import {
  switchMap,
  map,
  concatMap,
  concatMapTo,
  tap,
  catchError
} from 'rxjs/operators';
import { UserService } from '../apis/user.service';
import { AppState } from '../reducers';
import { UsersSelectors } from '../selectors/users.selector';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class UserEffects {
  @Effect()
  loadPageEffect: Observable<Action> = this.action$.pipe(
    ofType(UserActionType.LoadPage),
    switchMap((action: LoadPage) => {
      return this.userService.loadPage(action.payload.page).pipe(
        map(page => {
          return new SetUserPage({ page });
        })
      );
    })
  );

  @Effect()
  addUserEffect: Observable<Action> = this.action$.pipe(
    ofType(UserActionType.AddUser),
    switchMap((action: AddUser) => {
      return this.userService.addUser(action.payload.user);
    }),
    tap(user => {
      this.toastr.success(
        `Successfully added user ${user.firstName}`,
        'Add User'
      );
    }),
    concatMapTo(this.store.pipe(select(this.selectors.page))),
    map(
      pageNumber =>
        new LoadPage({
          page: {
            pageNumber,
            pageSize: 10
          }
        })
    ),
    catchError((error: HttpErrorResponse) => {
      this.toastr.error(error.error['message'], 'Add User');
      return EMPTY;
    })
  );

  @Effect()
  editUserEffect: Observable<Action> = this.action$.pipe(
    ofType(UserActionType.EditUser),
    switchMap((action: EditUser) => {
      return this.userService.updateUser(action.payload.user);
    }),
    tap(user => {
      this.toastr.success(
        `Successfully updated user ${user.firstName}`,
        'Edit User'
      );
    }),
    concatMapTo(this.store.pipe(select(this.selectors.page))),
    map(
      pageNumber =>
        new LoadPage({
          page: {
            pageNumber,
            pageSize: 10
          }
        })
    ),
    catchError((error: HttpErrorResponse) => {
      this.toastr.error(error.error['message'], 'Update User');
      return EMPTY;
    })
  );

  @Effect()
  deleteEffect: Observable<Action> = this.action$.pipe(
    ofType(UserActionType.DeleteUser),
    switchMap((action: DeleteUser) => {
      const { userId } = action.payload;
      return this.userService.deleteUser(userId);
    }),
    tap(user => {
      this.toastr.success(
        `Successfully deleted user ${user.firstName}`,
        'Delete User'
      );
    }),
    concatMapTo(this.store.pipe(select(this.selectors.page))),
    map(
      pageNumber =>
        new LoadPage({
          page: {
            pageNumber,
            pageSize: 10
          }
        })
    ),
    catchError((error: HttpErrorResponse) => {
      this.toastr.error(error.error['message'], 'Delete User');
      return EMPTY;
    })
  );

  constructor(
    public action$: Actions,
    private userService: UserService,
    private store: Store<AppState>,
    private selectors: UsersSelectors,
    private toastr: ToastrService
  ) {}
}
