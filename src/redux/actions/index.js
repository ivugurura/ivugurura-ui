import { SEARCH_QUERY } from './actionTypes';
import { http } from '../../helpers';

export * from './actionTypes';
export * from './categories';
export * from './languages';
export * from './fileUpload';
export * from './user';
export * from './topics';
export * from './comments';
export * from './albums';
export * from './media';
export * from './communique';

export const searchQuery = (input) => {
  return {
    type: SEARCH_QUERY,
    payload: http.get(`/search?searchKey=${input}`),
  };
};
