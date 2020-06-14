import { GET_MEDIAS } from './actionTypes';
import { http } from '../../helpers';

export const getMedias = () => {
  return {
    type: GET_MEDIAS,
    payload: http.get('/albums/medias/all'),
  };
};
