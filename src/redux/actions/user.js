import { LOGIN_USER, SET_USER } from './actionTypes';
import { http } from '../../helpers';

export const loginUser = (userInfo) => {
  return {
    type: LOGIN_USER,
    payload: http.post('/user/login', userInfo),
  };
};

export const setUser = (userInfo) => {
  return {
    type: SET_USER,
    payload: userInfo,
  };
};
