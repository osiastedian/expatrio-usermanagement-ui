import {
  UserActions,
  UserActionType,
  SetUserPage,
  ShowError
} from '../actions/users.action';
import { User } from '../models';

export interface UsersState {
  content: User[];
  totalPages: number;
  pageNumber: number;
}

export const initState: UsersState = {
  content: [],
  totalPages: 0,
  pageNumber: 0
};

export function UserReducer(
  state: UsersState = initState,
  action: UserActions
) {
  switch (action.type) {
    case UserActionType.SetUserPage: {
      const { page } = (action as SetUserPage).payload;
      const newState = { ...state};
      newState.content = page.content;
      newState.totalPages = page.totalPages;
      newState.pageNumber = page.number;
      return newState;
    }

    case UserActionType.ShowError: {
      const { error } = (action as ShowError).payload;
      console.error('User Error', error);
      break;
    }
  }
  return state;
}
