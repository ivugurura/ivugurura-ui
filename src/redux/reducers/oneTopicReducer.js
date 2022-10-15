import { baseState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import {
  VIEW_TOPIC_DETAIL,
  ADD_NEW_TOPIC,
  UPDATE_TOPIC,
  RESET_ADD_TOPIC,
  RESET_UPDATE_TOPIC,
} from '../actions';

const topicView = { category: { relatedTopics: [] }, commentaries: [] };
export const topicGetReducer = (
  state = baseState('topic', topicView),
  action
) => {
  switch (action.type) {
    case pending(VIEW_TOPIC_DETAIL):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(VIEW_TOPIC_DETAIL):
      return {
        ...state,
        loading: false,
        done: true,
        topic: action.payload.data.data,
      };
    case rejected(VIEW_TOPIC_DETAIL):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const topicAddReducer = (state = baseState(), action) => {
  switch (action.type) {
    case pending(ADD_NEW_TOPIC):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(ADD_NEW_TOPIC):
      return {
        ...state,
        loading: false,
        done: true,
      };
    case RESET_ADD_TOPIC:
      return {
        ...state,
        done: false,
      };
    case rejected(ADD_NEW_TOPIC):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const topicEditReducer = (state = baseState(), action) => {
  switch (action.type) {
    case pending(UPDATE_TOPIC):
      return {
        ...state,
        done: false,
        loading: true,
      };
    case fulfilled(UPDATE_TOPIC):
      return {
        ...state,
        loading: false,
        done: true,
      };
    case RESET_UPDATE_TOPIC:
      return {
        ...state,
        done: false,
      };
    case rejected(UPDATE_TOPIC):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
