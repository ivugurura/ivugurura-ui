import { ADD_COMMENT } from './actionTypes';
import { http } from '../../helpers';

export const addTopicComment = (commentBody, topicSlug) => {
  const commentUrl = `/topics/${topicSlug}/comments`;
  return {
    type: ADD_COMMENT,
    payload: http.post(commentUrl, commentBody),
  };
};
