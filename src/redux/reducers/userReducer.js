import { initialUserState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { LOGIN_USER, LOGOUT_USER, SET_USER } from '../actions';

const logoutState = { loading: false, done: false, message: '' };
export const useReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case pending(LOGIN_USER):
      return {
        ...state,
        isAuthenticated: false,
        userLoading: true
      };
    case fulfilled(LOGIN_USER):
      return {
        ...state,
        userLoading: false,
        userFetched: true,
        isAuthenticated: true,
        info: action.payload.data.data
      };
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        info: action.payload
      };
    case rejected(LOGIN_USER):
    default:
      return {
        ...state,
        userLoading: false
      };
  }
};
export const logoutUserReducer = (state = logoutState, action) => {
  switch (action.type) {
    case pending(LOGOUT_USER):
      return {
        ...state,
        done: false,
        loading: true
      };
    case fulfilled(LOGOUT_USER):
      return {
        ...state,
        done: true,
        loading: true,
        message: action.payload.data.message
      };
    case rejected(LOGOUT_USER):
    default:
      return {
        ...state,
        loading: false
      };
  }
};
