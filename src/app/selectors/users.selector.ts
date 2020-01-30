import { Injectable } from '@angular/core';
import {
  MemoizedSelector,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';
import { AppState } from '../reducers';
import { UsersState } from '../reducers/users.reducer';

@Injectable()
export class UsersSelectors {
  private mainSelector: MemoizedSelector<AppState, UsersState>;
  constructor() {
    this.mainSelector = createFeatureSelector<AppState, UsersState>('users');
  }

  get page() {
    return createSelector(this.mainSelector, state => state.pageNumber);
  }

  get displayedUsers() {
    return createSelector(this.mainSelector, state => state.content || []);
  }

  get totalPages() {
    return createSelector(this.mainSelector, state => state.totalPages);
  }

  get currentPage() {
    return createSelector(this.mainSelector, state => state.pageNumber);
  }
}
