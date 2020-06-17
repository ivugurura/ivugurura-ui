import { initialCommentState } from '../initialStates';
import { fulfilled, pending, rejected } from '../../utils/actions';
import { ADD_COMMENT } from '../actions';

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
