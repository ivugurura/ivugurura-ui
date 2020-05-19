import { initialOneTopicState } from '../../helpers';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { VIEW_TOPIC_DETAIL, ADD_NEW_TOPIC } from '../actions';

export const oneTopicReducer = (state = initialOneTopicState, action) => {
  switch (action.type) {
    case pending(VIEW_TOPIC_DETAIL):
      return {
        ...state,
        topicLoading: true,
      };
    case fulfilled(VIEW_TOPIC_DETAIL):
      return {
        ...state,
        topicLoading: false,
        topic: action.payload.data.data,
      };
    case rejected(VIEW_TOPIC_DETAIL):
      return {
        ...state,
        topicLoading: false,
      };
    case pending(ADD_NEW_TOPIC):
      return {
        ...state,
        newTopicLoading: true,
      };
    case fulfilled(ADD_NEW_TOPIC):
      return {
        ...state,
        newTopicLoading: false,
        newTopicMesg: 'Added',
      };
    case rejected(ADD_NEW_TOPIC):
      return {
        ...state,
        newTopicLoading: false,
      };
    default:
      return state;
  }
};
