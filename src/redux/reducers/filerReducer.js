import { initialFilerState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import {
  UPLOAD_FILE,
  DELETE_FILE,
  SET_FILE_PATH,
  RESET_FILE_PATH,
} from '../actions';

export const filerReducer = (state = initialFilerState, action) => {
  switch (action.type) {
    case pending(UPLOAD_FILE):
      return {
        ...state,
        uploadLoading: true,
      };
    case fulfilled(UPLOAD_FILE):
      return {
        ...state,
        uploadLoading: false,
        uploaded: true,
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
const fileInitialState = { hasUploaded: false, filePathName: '' };
export const filePathReducer = (state = fileInitialState, action) => {
  switch (action.type) {
    case SET_FILE_PATH:
      return {
        ...state,
        hasUploaded: true,
        filePathName: action.payload,
      };
    case RESET_FILE_PATH:
    default:
      return fileInitialState;
  }
};
