import { initialCategoryState } from '../../helpers';
import { fulfilled, pending, rejected } from '../../utils/actions';
import { GET_NAVS_CATEGORIES, GET_CATEGORIES } from '../actions';

export const categoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case pending(GET_NAVS_CATEGORIES):
      return {
        ...state,
        navLoading: true,
      };
    case fulfilled(GET_NAVS_CATEGORIES):
      return {
        ...state,
        navLoading: false,
        navCategories: action.payload.data.data,
      };
    case rejected(GET_NAVS_CATEGORIES):
      return {
        ...state,
        navLoading: false,
      };
    case pending(GET_CATEGORIES):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(GET_CATEGORIES):
      return {
        ...state,
        loading: false,
        categories: action.payload.data.data,
      };
    case rejected(GET_CATEGORIES):
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
