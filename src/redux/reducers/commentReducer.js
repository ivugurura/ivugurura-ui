import { initialCommentState, topicCommentsState } from '../initialStates';
import { fulfilled, pending, rejected } from '../../utils/actions';
import { ADD_COMMENT, GET_TOPICS_COMMENTS } from '../actions';

export const commentReducer = (state = initialCommentState, action) => {
  switch (action.type) {
    case pending(ADD_COMMENT):
      return {
        ...state,
        commentLoading: true,
        commentAdded: false,
      };
    case fulfilled(ADD_COMMENT):
      return {
        ...state,
        commentLoading: false,
        commentAdded: true,
        newComment: action.payload.data.data,
      };
    case rejected(ADD_COMMENT):
    default:
      return {
        ...state,
        commentLoading: false,
      };
  }
};
export const commentsTopicReducer = (state = topicCommentsState, action) => {
  switch (action.type) {
    case pending(GET_TOPICS_COMMENTS):
      return {
        ...state,
        commentsFetching: true,
      };
    case fulfilled(GET_TOPICS_COMMENTS):
      return {
        ...state,
        commentsFetching: false,
        commentsFetched: true,
        comments: action.payload.data.data,
      };
    case rejected(GET_TOPICS_COMMENTS):
    default:
      return {
        ...state,
        commentsFetching: false,
      };
  }
};
