import axios from 'axios';

import { lStorage, systemLanguage } from './utils/constants';

export const VERBS = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
};

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: lStorage.token,
    'Accept-Language': systemLanguage,
  },
});

export const createHttp = () => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_CHAT_BASE_URL}/api/v1`,
    withCredentials: true,
    headers: {
      Authorization: lStorage.token,
      'Accept-Language': systemLanguage,
    },
  });
};
