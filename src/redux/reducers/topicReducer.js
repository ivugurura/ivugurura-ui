import { initialTopicState } from '../../helpers';
import { fulfilled, pending, rejected } from '../../utils/actions';
import { GET_CARSOUL_TOPICS, GET_RECENT_TOPICS } from '../actions';

export const topicReducer = (state = initialTopicState, action) => {
  switch (action.type) {
    case pending(GET_CARSOUL_TOPICS):
      return {
        ...state,
        carsoulLoading: true,
      };
    case fulfilled(GET_CARSOUL_TOPICS):
      return {
        ...state,
        carsoulLoading: false,
        carsoulTopics: action.payload.data.data,
      };
    case rejected(GET_CARSOUL_TOPICS):
      return {
        ...state,
        carsoulLoading: false,
      };
    case pending(GET_RECENT_TOPICS):
      return {
        ...state,
        recentLoading: true,
      };
    case fulfilled(GET_RECENT_TOPICS):
      return {
        ...state,
        recentLoading: false,
        recentTopics: action.payload.data.data,
      };
    case rejected(GET_RECENT_TOPICS):
      return {
        ...state,
        recentLoading: false,
      };
    default:
      return state;
  }
};
