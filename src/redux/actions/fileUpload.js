import { UPLOAD_FILE, SET_UPLOADED_PCT, DELETE_FILE } from './actionTypes';
import { http } from '../../helpers';

export const setUploadedPct = (pct) => {
  return {
    type: SET_UPLOADED_PCT,
    payload: pct,
  };
};
export const uploadFile = (fileData, type = 'image', prevFile = '') => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
    // onUploadProgess: (progressEvent) => {
    //   console.log('pct', progressEvent.loaded);

    //   setUploadedPct(
    //     parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total))
    //   );
    //   setTimeout(() => setUploadedPct(0), 10000);
    // },
  };
  const uploadUrl = `/albums/upload/${type}?prevFile=${prevFile}`;
  return {
    type: UPLOAD_FILE,
    payload: http.post(uploadUrl, fileData, config),
  };
};
export const deleteFile = (fileType, fileName) => {
  const pathUrl = `${fileType}/${fileName}`;
  return {
    type: DELETE_FILE,
    payload: http.delete(`/albums/${pathUrl}`),
  };
};
