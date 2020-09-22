import {
  GET_CARSOUL_TOPICS,
  GET_RECENT_TOPICS,
  VIEW_TOPIC_DETAIL,
  ADD_NEW_TOPIC,
  GET_DASHBOARD_COUNTS,
  UPDATE_TOPIC,
  GET_CATEGORY_TOPICS,
  GET_ADMIN_TOPICS
} from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const getTopics = ({ page, pageSize, category }) => {
  let categoryType = GET_CATEGORY_TOPICS;
  switch (category) {
    case 'carsoul':
      categoryType = GET_CARSOUL_TOPICS;
      break;
    case 'recent':
      categoryType = GET_RECENT_TOPICS;
      break;
    default:
      break;
  }
  const params = `page=${page}&pageSize=${pageSize}&category=${category}`;
  return {
    type: categoryType,
    payload: http.get(`/topics?${params}`)
  };
};

export const getTopicDetail = (topicSlug) => {
  store.dispatch({
    type: VIEW_TOPIC_DETAIL,
    payload: http.get(`/topics/${topicSlug}`)
  });
};
export const addTopic = (newTopic) => {
  return {
    type: ADD_NEW_TOPIC,
    payload: http.post('/topics', newTopic)
  };
};
export const getDashboardTopics = (page = 1, pageSize = 20) => {
  const params = `page=${page}&pageSize=${pageSize}`;
  store.dispatch({
    type: GET_ADMIN_TOPICS,
    payload: http.get(`/user/topics?${params}`)
  });
};
export const getDashboadCount = () => {
  return {
    type: GET_DASHBOARD_COUNTS,
    payload: http.get('/user/dashboard')
  };
};
export const updateTopic = (updatedTopic, topicSlug) => {
  return {
    type: UPDATE_TOPIC,
    payload: http.patch(`/topics/${topicSlug}`, updatedTopic)
  };
};
