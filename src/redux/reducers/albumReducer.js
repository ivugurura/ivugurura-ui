import { fulfilled, pending, rejected } from '../../utils/actions';
import { ADD_ALBUM, GET_ALBUMS } from '../actions';
import { albumState } from '../initialStates';

export const albumReducer = (state = albumState, action) => {
  switch (action.type) {
    case pending(ADD_ALBUM):
      return {
        ...state,
        albumAdded: false,
        albumAdding: true,
      };
    case pending(GET_ALBUMS):
      return {
        ...state,
        albumsFetching: true,
      };
    case fulfilled(ADD_ALBUM):
      return {
        ...state,
        albumAdding: false,
        albumAdded: true,
      };
    case fulfilled(GET_ALBUMS):
      return {
        ...state,
        albumsFetched: true,
        albumsFetching: false,
        albums: action.payload.data.data,
      };
    case rejected(GET_ALBUMS):
    case rejected(ADD_ALBUM):
    default:
      return {
        ...state,
        albumsFetching: false,
        albumAdding: false,
      };
  }
};
