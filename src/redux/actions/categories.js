import {
  GET_NAVS_CATEGORIES,
  GET_CATEGORIES,
  GET_CATEGORY_DETAIL
} from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const getCategories = (categoryType) => {
  const actionType =
    categoryType === '/' ? GET_CATEGORIES : GET_NAVS_CATEGORIES;
  store.dispatch({
    type: actionType,
    payload: http.get(`/categories${categoryType}`)
  });
};
export const getCategoryDetail = (categorySlug) => {
  return {
    type: GET_CATEGORY_DETAIL,
    payload: http.get(`/categories/${categorySlug}`)
  };
};
