import { ADD_ALBUM, GET_ALBUMS } from './actionTypes';
import { http } from '../../helpers';

export const addAlbum = (album) => {
  return {
    type: ADD_ALBUM,
    payload: http.post('/albums', album),
  };
};
export const getAlbums = () => {
  return {
    type: GET_ALBUMS,
    payload: http.get('/albums'),
  };
};
