import { initialUserState } from '../../helpers';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { LOGIN_USER, SET_USER } from '../actions';
import { error } from '../errorHandler';

export const useReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case pending(LOGIN_USER):
      return {
        ...state,
        userLoading: true,
      };
    case fulfilled(LOGIN_USER):
      return {
        ...state,
        userLoading: false,
        userFetched: true,
        isAuthenticated: true,
        info: action.payload.data.data,
      };
    case rejected(LOGIN_USER):
      return {
        ...state,
        userLoading: false,
        errorMesg: error(action.payload),
      };
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        info: action.payload,
      };
    default:
      return state;
  }
};
