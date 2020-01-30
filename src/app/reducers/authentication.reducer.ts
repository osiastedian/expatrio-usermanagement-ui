import {
  AuthenticationActions,
  AuthenticationActionTypes,
  SetIsLoggedIn,
  SetCurrentUser,
  SetAuthentication
} from "../actions/authentication.actions";
import { Authentication, User } from "../models";

export interface AuthenticationState {
  isLoggedIn: boolean;
  authentication: Authentication;
  currentUser: User;
}

const initialState: AuthenticationState = {
  isLoggedIn: false,
  authentication: null,
  currentUser: null
};

export function AuthenticationReducer(
  state: AuthenticationState = initialState,
  action: AuthenticationActions
): AuthenticationState {
  switch (action.type) {
    case AuthenticationActionTypes.SetIsLoggedIn: {
      const { isLoggedIn } = (action as SetIsLoggedIn).payload;
      const newState = { ...state };
      newState.isLoggedIn = isLoggedIn;
      return newState;
    }

    case AuthenticationActionTypes.SetCurrentUser: {
      const { user } = (action as SetCurrentUser).payload;
      const newState = { ...state };
      newState.currentUser = { ...user };
      return newState;
    }

    case AuthenticationActionTypes.SetAuthentication: {
      const { authentication } = (action as SetAuthentication).payload;
      const newState = { ...state };
      newState.authentication = { ...authentication };
      return newState;
    }
  }
  return state;
}
