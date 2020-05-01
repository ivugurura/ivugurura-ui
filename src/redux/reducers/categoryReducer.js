import { initialCategoryState } from '../../helpers';
import { fulfilled, pending } from '../../utils/actions';
import { GET_NAVS_CATEGORIES } from '../actions';

export const categoryReducer = (state = initialCategoryState, action) => {
  switch (action.type) {
    case pending(GET_NAVS_CATEGORIES):
      return {
        ...state,
        loading: true,
      };
    case fulfilled(GET_NAVS_CATEGORIES):
      return {
        ...state,
        loading: false,
        navsFetched: true,
        navCategories: action.payload.data.data,
      };
    default:
      return state;
  }
};
