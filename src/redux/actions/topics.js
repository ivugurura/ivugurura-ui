import {
  GET_CARSOUL_TOPICS,
  GET_ALL_TOPICS,
  GET_RECENT_TOPICS,
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
  return {
    type: categoryType,
    payload: http.get(
      `/topics?page=${page}&pageSize=${pageSize}&category=${category}`
    ),
  };
};
