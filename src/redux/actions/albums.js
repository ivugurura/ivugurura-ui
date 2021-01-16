import { ADD_ALBUM, GET_ALBUMS } from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const addAlbum = (album) => {
	store.dispatch({
		type: ADD_ALBUM,
		payload: http.post('/albums', album)
	});
};
export const getAlbums = () => {
	store.dispatch({
		type: GET_ALBUMS,
		payload: http.get('/albums')
	});
};
