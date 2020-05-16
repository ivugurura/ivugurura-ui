import { initialFilerState } from '../../helpers';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { UPLOAD_FILE } from '../actions';

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
        coverImagePath: action.payload.data.data,
      };
    case rejected(UPLOAD_FILE):
      return {
        ...state,
        uploadLoading: false,
      };
    default:
      return state;
  }
};
