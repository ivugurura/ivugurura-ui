import {
  initialCommentState,
  topicCommentsState,
  publishCommentState,
} from '../initialStates';
import { fulfilled, pending, rejected } from '../../utils/actions';
import {
  ADD_COMMENT,
  GET_TOPICS_COMMENTS,
  GET_COMMENTS_ADMIN,
  PUBLISH_COMMENT,
  RESET_PUBLISH_COMMENT,
  RESET_ADD_COMMENT,
} from '../actions';

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
    case RESET_ADD_COMMENT:
    case rejected(ADD_COMMENT):
    default:
      return {
        ...state,
        commentAdded: false,
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
        totalItems: action.payload.data.totalItems,
      };
    case rejected(GET_TOPICS_COMMENTS):
    default:
      return {
        ...state,
        commentsFetching: false,
      };
  }
};
export const adminCommentsReducer = (
  state = { loading: false, loaded: false, comments: [], totalItems: 0 },
  action
) => {
  switch (action.type) {
    case pending(GET_COMMENTS_ADMIN):
      return {
        ...state,
        loading: false,
      };
    case fulfilled(GET_COMMENTS_ADMIN):
      return {
        ...state,
        loading: false,
        loaded: true,
        comments: action.payload.data.data,
        totalItems: action.payload.data.totalItems,
      };
    case rejected(GET_COMMENTS_ADMIN):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const publishCommentReducer = (state = publishCommentState, action) => {
  switch (action.type) {
    case pending(PUBLISH_COMMENT):
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    case fulfilled(PUBLISH_COMMENT):
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case RESET_PUBLISH_COMMENT:
    case rejected(PUBLISH_COMMENT):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
