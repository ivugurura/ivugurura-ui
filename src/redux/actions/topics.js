import {
  GET_CARSOUL_TOPICS,
  GET_ALL_TOPICS,
  GET_RECENT_TOPICS,
  VIEW_TOPIC_DETAIL,
  ADD_NEW_TOPIC,
  GET_PUBLISHED_TOPICS,
  GET_UNPUBLISHED_TOPICS,
  GET_DASHBOARD_COUNTS,
  UPDATE_TOPIC,
} from './actionTypes';
import { http } from '../../helpers';

export const getTopics = ({ page, pageSize, category }) => {
  let categoryType = GET_ALL_TOPICS;
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
    payload: http.get(`/topics?${params}`),
  };
};

export const getTopicDetail = (topicSlug) => {
  return {
    type: VIEW_TOPIC_DETAIL,
    payload: http.get(`/topics/${topicSlug}`),
  };
};
export const addTopic = (newTopic) => {
  return {
    type: ADD_NEW_TOPIC,
    payload: http.post('/topics', newTopic),
  };
};
export const getDashboardTopics = (topicStatus, page, pageSize) => {
  const topicActionType =
    topicStatus === 'published' ? GET_PUBLISHED_TOPICS : GET_UNPUBLISHED_TOPICS;
  const params = `page=${page}&pageSize=${pageSize}`;
  return {
    type: topicActionType,
    payload: http.get(`/user/topics/${topicStatus}?${params}`),
  };
};
export const getDashboadCount = () => {
  return {
    type: GET_DASHBOARD_COUNTS,
    payload: http.get('/user/dashboard'),
  };
};
export const updateTopic = (updatedTopic, topicSlug) => {
  return {
    type: UPDATE_TOPIC,
    payload: http.patch(`/topics/${topicSlug}`, updatedTopic),
  };
};
