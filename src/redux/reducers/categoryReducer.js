import { initialCategoryState } from '../initialStates';
import { fulfilled, pending, rejected } from '../../utils/actions';
import {
  GET_NAVS_CATEGORIES,
  GET_CATEGORIES,
  ADD_NEW_CATEGORY,
} from '../actions';

const addCategoryState = { loading: false, done: false, newCategory: {} };
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
export const categoryAddReducer = (state = addCategoryState, action) => {
  switch (action.type) {
    case pending(ADD_NEW_CATEGORY):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(ADD_NEW_CATEGORY):
      return {
        ...state,
        loading: false,
        done: true,
        newCategory: action.payload.data.data,
      };
    case rejected(ADD_NEW_CATEGORY):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
