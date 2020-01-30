import { Injectable } from '@angular/core';
import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { AuthenticationState } from '../reducers/authentication.reducer';
import { AppState } from '../reducers';

@Injectable()
export class AuthenticationSelectors {
  private mainSelector: MemoizedSelector<AppState, AuthenticationState>;
  constructor() {
    this.mainSelector = createFeatureSelector<AppState, AuthenticationState>(
      'authentication'
    );
  }

  get isLoggedIn() {
    return createSelector(
      this.mainSelector,
      state => state.isLoggedIn
    );
  }

  get currentUser() {
    return createSelector(
      this.mainSelector,
      state => state.currentUser
    );
  }
}
