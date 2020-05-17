import { UPLOAD_FILE, SET_UPLOADED_PCT } from './actionTypes';
import { http } from '../../helpers';

export const setUploadedPct = (pct) => {
  return {
    type: SET_UPLOADED_PCT,
    payload: pct,
  };
};
export const uploadFile = (fileData) => {
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
  return {
    type: UPLOAD_FILE,
    payload: http.post(`/albums/upload/image`, fileData, config),
  };
};
