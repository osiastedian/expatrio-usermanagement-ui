import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from "@ngrx/store";
import { environment } from "../../environments/environment";
import {
  AuthenticationState,
  AuthenticationReducer
} from "./authentication.reducer";

export interface AppState {
  authentication: AuthenticationState;
}

export const reducers: ActionReducerMap<AppState> = {
  authentication: AuthenticationReducer
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
