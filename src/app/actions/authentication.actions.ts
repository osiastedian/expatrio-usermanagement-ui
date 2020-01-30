import { Action } from '@ngrx/store';
import { Authentication, User } from '../models';

export const enum AuthenticationActionTypes {
  Login = '[Authentication] Login',
  Logout = '[Authentication] Logout',
  CheckAuthentication = '[Authentication] CheckAuthentication',
  SetAuthentication = '[Authentication] SetAuthentication',
  CheckCode = '[Authentication] CheckCode',
  SetIsLoggedIn = '[Authentication] SetIsLoggedIn',
  FetchAccessToken = '[Authentication] FetchAccessToken',
  FetchCurrentUser = '[Authentication] FetchCurrentUser',
  SetCurrentUser = '[Authentication] SetCurrentUser'
}

export class Login implements Action {
  public type = AuthenticationActionTypes.Login;
  constructor(public payload: { redirect_uri: string }) {}
}

export class Logout implements Action {
  public type = AuthenticationActionTypes.Logout;
  constructor() {}
}

export class CheckAuthentication implements Action {
  public type = AuthenticationActionTypes.CheckAuthentication;
  constructor() {}
}

export class SetAuthentication implements Action {
  public type = AuthenticationActionTypes.SetAuthentication;
  constructor(public payload: { authentication: Authentication }) {}
}

export class SetIsLoggedIn implements Action {
  public type = AuthenticationActionTypes.SetIsLoggedIn;
  constructor(public payload: { isLoggedIn: boolean }) {}
}

export class FetchAccessToken implements Action {
  public type = AuthenticationActionTypes.FetchAccessToken;
  constructor() {}
}

export class FetchCurrentUser implements Action {
  public type = AuthenticationActionTypes.FetchCurrentUser;
  constructor() {}
}

export class SetCurrentUser implements Action {
  public type = AuthenticationActionTypes.SetCurrentUser;
  constructor(public payload: { user: User }) {}
}

export type AuthenticationActions =
  | Login
  | Logout
  | CheckAuthentication
  | SetAuthentication
  | SetIsLoggedIn
  | FetchAccessToken
  | FetchCurrentUser
  | SetCurrentUser;
