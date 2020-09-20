import { LOGIN_USER, LOGOUT_USER, SET_USER } from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const loginUser = (userInfo) => {
  return {
    type: LOGIN_USER,
    payload: http.post('/user/login', userInfo)
  };
};

export const setUser = (userInfo) => {
  return {
    type: SET_USER,
    payload: userInfo
  };
};
export const logoutUser = () => {
  store.dispatch({
    type: LOGOUT_USER,
    payload: http.get('/user/logout')
  });
};
