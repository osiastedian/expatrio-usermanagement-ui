import { Action } from '@ngrx/store';
import { User } from '../models';
import { Page } from '../models/page';
import { Pageable } from '../models/pageable';

export const enum UserActionType {
  AddUser = '[Users] AddUser',
  EditUser = '[Users] EditUser',
  DeleteUser = '[Users] DeleteUser',
  LoadPage = '[Users] LoadPage',
  SetUserPage = '[Users] SetUsers',
  ShowError = '[Users] ShowError'
}

export class AddUser implements Action {
  public type = UserActionType.AddUser;
  constructor(public payload: { user: User }) {}
}

export class EditUser implements Action {
  public type = UserActionType.EditUser;
  constructor(public payload: { user: User }) {}
}

export class DeleteUser implements Action {
  public type = UserActionType.DeleteUser;
  constructor(public payload: { userId: string }) {}
}

export class SetUserPage implements Action {
  public type = UserActionType.SetUserPage;
  constructor(public payload: { page: Page<User> }) {}
}

export class LoadPage implements Action {
  public type = UserActionType.LoadPage;
  constructor(public payload: { page: Pageable }) {}
}

export class ShowError implements Action {
  public type = UserActionType.ShowError;
  constructor(public payload: { error: any }) {}
}

export type UserActions =
  | AddUser
  | EditUser
  | DeleteUser
  | SetUserPage
  | LoadPage | ShowError;
