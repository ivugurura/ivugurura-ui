import { mediaState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { GET_MEDIAS } from '../actions';

export const mediaReducer = (state = mediaState, action) => {
  switch (action.type) {
    case pending(GET_MEDIAS):
      return {
        ...state,
        mediasFetching: true,
      };
    case fulfilled(GET_MEDIAS):
      return {
        ...state,
        mediasFetching: false,
        mediasFetched: true,
        medias: action.payload.data.data,
      };
    case rejected(GET_MEDIAS):
    default:
      return {
        ...state,
        mediasFetching: false,
      };
  }
};
