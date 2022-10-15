import { baseState, mediaState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import {
  GET_MEDIAS,
  ADD_NEW_MEDIA,
  DELETE_SONG,
  EDIT_SONG,
  SHARE_SONG,
  GET_MEDIA_COUNTS,
  GET_COVER_IMAGES,
} from '../actions';

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
        mediaAdded: false,
      };
    case fulfilled(GET_MEDIAS):
      return {
        ...state,
        mediasFetching: false,
        mediasFetched: true,
        medias: action.payload.data.data,
        totalItems: action.payload.data.totalItems,
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
export const songDelReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(DELETE_SONG):
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case fulfilled(DELETE_SONG):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    case rejected(DELETE_SONG):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const songEditReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(EDIT_SONG):
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case fulfilled(EDIT_SONG):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    case rejected(EDIT_SONG):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const songShareReducer = (state = baseState('message', ''), action) => {
  switch (action.type) {
    case pending(SHARE_SONG):
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case fulfilled(SHARE_SONG):
      return {
        ...state,
        loading: false,
        loaded: true,
        message: action.payload.data.message,
      };
    case rejected(SHARE_SONG):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const mediaCountReducer = (state = baseState('counts', {}), action) => {
  switch (action.type) {
    case pending(GET_MEDIA_COUNTS):
      return {
        ...state,
        loaded: false,
        loading: true,
      };
    case fulfilled(GET_MEDIA_COUNTS):
      return {
        ...state,
        loading: false,
        loaded: true,
        counts: action.payload.data.data,
      };
    case rejected(GET_MEDIA_COUNTS):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
export const coverImagesGetReducer = (
  state = baseState('coverImages', []),
  action
) => {
  switch (action.type) {
    case pending(GET_COVER_IMAGES):
      return {
        ...state,
        loaded: false,
      };
    case fulfilled(GET_COVER_IMAGES):
      return {
        ...state,
        loading: false,
        loaded: true,
        coverImages: action.payload.data.data,
      };
    case rejected(GET_COVER_IMAGES):
    default:
      return {
        ...state,
        loading: false,
      };
  }
};
