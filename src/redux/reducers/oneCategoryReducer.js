import { aCategoryState } from '../initialStates';
import { GET_CATEGORY_DETAIL } from '../actions';
import { pending, fulfilled, rejected } from '../../utils/actions';

export const oneCategoryReducer = (state = aCategoryState, action) => {
  switch (action.type) {
    case pending(GET_CATEGORY_DETAIL):
      return {
        ...state,
        categoryFetched: false,
        categoryFetching: true
      };
    case fulfilled(GET_CATEGORY_DETAIL):
      return {
        ...state,
        categoryFetching: false,
        categoryFetched: true,
        category: action.payload.data.data
      };
    case rejected(GET_CATEGORY_DETAIL):
    default:
      return {
        ...state,
        categoryFetching: false
      };
  }
};
