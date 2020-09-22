import { initialOneTopicState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { VIEW_TOPIC_DETAIL, ADD_NEW_TOPIC, UPDATE_TOPIC } from '../actions';

export const oneTopicReducer = (state = initialOneTopicState, action) => {
  switch (action.type) {
    case pending(VIEW_TOPIC_DETAIL):
      return {
        ...state,
        topicFetched: false,
        topicLoading: true
      };
    case fulfilled(VIEW_TOPIC_DETAIL):
      return {
        ...state,
        topicLoading: false,
        topicFetched: true,
        topic: action.payload.data.data
      };
    case pending(ADD_NEW_TOPIC):
      return {
        ...state,
        newTopicAdded: false,
        newTopicLoading: true
      };
    case fulfilled(ADD_NEW_TOPIC):
      return {
        ...state,
        newTopicLoading: false,
        newTopicAdded: true
      };
    case pending(UPDATE_TOPIC):
      return {
        ...state,
        topicUpdated: false,
        topicUpdating: true
      };
    case fulfilled(UPDATE_TOPIC):
      return {
        ...state,
        topicUpdating: false,
        topicUpdated: true
      };
    case rejected(VIEW_TOPIC_DETAIL):
    case rejected(ADD_NEW_TOPIC):
    case rejected(UPDATE_TOPIC):
    default:
      return {
        ...state,
        topicLoading: false,
        topicUpdating: false,
        newTopicLoading: false
      };
  }
};
