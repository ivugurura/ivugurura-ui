import { initialDashState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import {
  GET_DASHBOARD_COUNTS,
  GET_PUBLISHED_TOPICS,
  GET_UNPUBLISHED_TOPICS,
} from '../actions';

export const dashboardReducer = (state = initialDashState, action) => {
  switch (action.type) {
    case pending(GET_DASHBOARD_COUNTS):
      return {
        ...state,
        countLoading: true,
      };
    case fulfilled(GET_DASHBOARD_COUNTS):
      return {
        ...state,
        countLoading: false,
        counts: action.payload.data.data,
      };
    case rejected(GET_DASHBOARD_COUNTS):
      return {
        ...state,
        countLoading: false,
      };
    case pending(GET_PUBLISHED_TOPICS):
      return {
        ...state,
        publishedLoading: true,
      };
    case fulfilled(GET_PUBLISHED_TOPICS):
      return {
        ...state,
        publishedLoading: false,
        published: action.payload.data.data,
      };
    case rejected(GET_PUBLISHED_TOPICS):
      return {
        ...state,
        publishedLoading: false,
      };
    case pending(GET_UNPUBLISHED_TOPICS):
      return {
        ...state,
        unPublishedLoading: true,
      };
    case fulfilled(GET_UNPUBLISHED_TOPICS):
      return {
        ...state,
        unPublishedLoading: false,
        unPublished: action.payload.data.data,
      };
    case rejected(GET_UNPUBLISHED_TOPICS):
      return {
        ...state,
        unPublishedLoading: false,
      };
    default:
      return state;
  }
};
