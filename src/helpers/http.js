import axios from 'axios';

import { systemLanguage } from './utils/constants';

let token = 'null';
if (localStorage.user) {
  const user = JSON.parse(localStorage.user);
  token = user.token;
}

export const VERBS = {
  get: 'GET', post: 'POST', patch: 'PATCH', delete: 'DELETE',
};

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: token,
    'Accept-Language': systemLanguage,
  },
});

export const uploadFileWithProgress = (
  file,
  type = '',
  prevFile = '',
  onUploadProgress = () => {},
) => {
  const formData = new FormData();

  formData.append('file', file);

  const uploadUrl = `/albums/upload/${type}?prevFile=${prevFile}`;

  return http.post(uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};
