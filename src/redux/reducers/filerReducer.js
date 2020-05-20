import { initialFilerState } from '../../helpers';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { UPLOAD_FILE, SET_UPLOADED_PCT, DELETE_FILE } from '../actions';

export const filerReducer = (state = initialFilerState, action) => {
  switch (action.type) {
    case SET_UPLOADED_PCT:
      return {
        ...state,
        percent: action.payload.pct,
      };
    case pending(UPLOAD_FILE):
      return {
        ...state,
        uploadLoading: true,
      };
    case fulfilled(UPLOAD_FILE):
      return {
        ...state,
        uploadLoading: false,
        coverImagePath: action.payload.data.data,
      };
    case rejected(UPLOAD_FILE):
      return {
        ...state,
        uploadLoading: false,
      };
    case pending(DELETE_FILE):
      return {
        ...state,
        delLoading: true,
      };
    case fulfilled(DELETE_FILE):
      return {
        ...state,
        coverImagePath: '',
        deleteSuccess: true,
        delLoading: false,
      };
    case rejected(DELETE_FILE):
      return {
        ...state,
        delLoading: false,
      };
    default:
      return state;
  }
};
