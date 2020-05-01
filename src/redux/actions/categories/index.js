import { GET_NAVS_CATEGORIES } from '../actionTypes';
import { http } from '../../../helpers';

export const getNavCategories = () => {
  return {
    type: GET_NAVS_CATEGORIES,
    payload: http.get('/categories/navs'),
  };
};
