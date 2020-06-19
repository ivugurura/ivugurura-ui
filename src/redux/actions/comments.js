import { ADD_COMMENT, GET_TOPICS_COMMENTS } from './actionTypes';
import { http } from '../../helpers';

export const addTopicComment = (commentBody, topicSlug) => {
  const commentUrl = `/topics/${topicSlug}/comments`;
  return {
    type: ADD_COMMENT,
    payload: http.post(commentUrl, commentBody),
  };
};
export const getTopicsComments = (topicSlug) => {
  const commentUrl = `/topics/${topicSlug}/comments`;
  return {
    type: GET_TOPICS_COMMENTS,
    payload: http.get(commentUrl),
  };
};
