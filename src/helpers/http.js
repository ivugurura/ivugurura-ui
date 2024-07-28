import axios from 'axios';

import { systemLanguage, lStorage } from './utils/constants';

export const VERBS = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  put: 'PUT',
  delete: 'DELETE',
};

export const http = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
  withCredentials: true,
  headers: {
    Authorization: lStorage.token,
    'Accept-Language': systemLanguage,
  },
});
