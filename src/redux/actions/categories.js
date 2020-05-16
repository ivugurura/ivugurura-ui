import { GET_NAVS_CATEGORIES, GET_CATEGORIES } from './actionTypes';
import { http } from '../../helpers';

export const getCategories = (categoryType) => {
  const actionType =
    categoryType === '/' ? GET_CATEGORIES : GET_NAVS_CATEGORIES;
  return {
    type: actionType,
    payload: http.get(`/categories${categoryType}`),
  };
};
