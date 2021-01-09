import { GET_MEDIAS, ADD_NEW_MEDIA } from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const getMedias = (type = 'all') => {
	store.dispatch({
		type: GET_MEDIAS,
		payload: http.get(`/albums/medias/${type}`)
	});
};
export const addNewMedia = (media) => {
	return {
		type: ADD_NEW_MEDIA,
		payload: http.post('/albums/add', media)
	};
};
