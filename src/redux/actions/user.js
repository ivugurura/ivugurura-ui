import {
  ADD_NEW_USER,
  DELETE_USER,
  GET_USERS,
  LOGIN_USER,
  LOGOUT_USER,
  SET_USER,
  UPDATE_USER,
} from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const loginUser = (userInfo) => {
  return {
    type: LOGIN_USER,
    payload: http.post('/users/login', userInfo),
  };
};

export const setUser = (userInfo) => {
  return {
    type: SET_USER,
    payload: userInfo,
  };
};
export const logoutUser = () => {
  store.dispatch({
    type: LOGOUT_USER,
    payload: http.get('/users/logout'),
  });
};
export const getSystemUsers = ({ page = 1, pageSize = 20 }) => {
  const params = `page=${page}&pageSize=${pageSize}`;
  store.dispatch({
    type: GET_USERS,
    payload: http.get(`/users?${params}`),
  });
};
export const addUser = (userInfo = {}) => {
  console.log(userInfo);
  store.dispatch({
    type: ADD_NEW_USER,
    payload: http.post(`/users`, userInfo),
  });
};
export const editUser = (userId, userInfo = {}) => {
  if (userInfo.password === '') {
    delete userInfo.password;
  }
  store.dispatch({
    type: UPDATE_USER,
    payload: http.patch(`/users/${userId}`, userInfo),
  });
};
export const deleteUser = (userId) => {
  store.dispatch({
    type: DELETE_USER,
    payload: http.delete(`/users/${userId}`),
  });
};
