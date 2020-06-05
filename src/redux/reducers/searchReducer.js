import { searchState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { SEARCH_QUERY } from '../actions';

export const searchReducer = (state = searchState, action) => {
  switch (action.type) {
    case pending(SEARCH_QUERY):
      return {
        ...state,
        searching: true,
      };
    case fulfilled(SEARCH_QUERY):
      return {
        ...state,
        searching: false,
        finished: true,
        results: action.payload.data.data,
      };
    case rejected(SEARCH_QUERY):
    default:
      return {
        ...state,
        searching: false,
      };
  }
};
