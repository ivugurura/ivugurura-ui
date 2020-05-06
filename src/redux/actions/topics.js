import { GET_CARSOUL_TOPICS } from './actionTypes';
import { http } from '../../helpers';

export const getCarsoulTopics = ({ page, pageSize }) => {
  return {
    type: GET_CARSOUL_TOPICS,
    payload: http.get(`/topics?page=${page}&pageSize=${pageSize}`),
  };
};
