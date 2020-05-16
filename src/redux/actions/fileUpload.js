import { http } from '../../helpers';
import { UPLOAD_FILE } from './actionTypes';

export const uploadFile = (fileData) => {
  return {
    type: UPLOAD_FILE,
    payload: http.post('/albums/upload/image', fileData),
  };
};
