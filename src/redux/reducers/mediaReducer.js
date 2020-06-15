import { mediaState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { GET_MEDIAS, ADD_NEW_MEDIA } from '../actions';

export const mediaReducer = (state = mediaState, action) => {
  switch (action.type) {
    case pending(GET_MEDIAS):
      return {
        ...state,
        mediasFetching: true,
      };
    case pending(ADD_NEW_MEDIA):
      return {
        ...state,
        mediaAdding: true,
      };
    case fulfilled(GET_MEDIAS):
      return {
        ...state,
        mediasFetching: false,
        mediasFetched: true,
        medias: action.payload.data.data,
      };
    case fulfilled(ADD_NEW_MEDIA):
      return {
        ...state,
        mediaAdding: false,
        mediaAdded: true,
      };
    case rejected(GET_MEDIAS):
    case rejected(ADD_NEW_MEDIA):
    default:
      return {
        ...state,
        mediaAdding: false,
        mediasFetching: false,
      };
  }
};
