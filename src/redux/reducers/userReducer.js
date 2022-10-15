import { initialUserState, baseState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import {
  ADD_NEW_USER,
  DELETE_USER,
  GET_USERS,
  LOGIN_USER,
  LOGOUT_USER,
  SET_USER,
  UPDATE_USER,
} from '../actions';

const logoutState = { loading: false, done: false, message: '' };
export const useReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case pending(LOGIN_USER):
      return {
        ...state,
        isAuthenticated: false,
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
    case SET_USER:
      return {
        ...state,
        isAuthenticated: true,
        info: action.payload,
      };
    case rejected(LOGIN_USER):
    default:
      return {
        ...state,
        userLoading: false,
      };
  }
};
export const logoutUserReducer = (state = logoutState, action) => {
  switch (action.type) {
    case pending(LOGOUT_USER):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(LOGOUT_USER):
      return {
        ...state,
        done: true,
        loading: false,
        message: action.payload.data.message,
      };
    case rejected(LOGOUT_USER):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const usersGetReducer = (state = baseState('users', []), action) => {
  switch (action.type) {
    case pending(GET_USERS):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(GET_USERS):
      return {
        ...state,
        done: true,
        loading: false,
        users: action.payload.data.data,
        totalItems: action.payload.data.totalItems,
      };
    case rejected(GET_USERS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const userAddReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(ADD_NEW_USER):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(ADD_NEW_USER):
      return {
        ...state,
        done: true,
        loading: false,
        message: action.payload.data.message,
      };
    case rejected(ADD_NEW_USER):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const userEditReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(UPDATE_USER):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(UPDATE_USER):
      return {
        ...state,
        done: true,
        loading: false,
        message: action.payload.data.message,
      };
    case rejected(UPDATE_USER):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const userRmReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(DELETE_USER):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(DELETE_USER):
      return {
        ...state,
        done: true,
        loading: false,
        message: action.payload.data.message,
      };
    case rejected(DELETE_USER):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
