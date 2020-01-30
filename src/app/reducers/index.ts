import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import {
  AuthenticationState,
  AuthenticationReducer
} from './authentication.reducer';
import { UserReducer, UsersState } from './users.reducer';

export interface AppState {
  authentication: AuthenticationState;
  users: UsersState
}

export const reducers: ActionReducerMap<AppState> = {
  authentication: AuthenticationReducer,
  users: UserReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
