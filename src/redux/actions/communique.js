import {
	ADD_COMMUNIQUE,
	GET_COMMUNIQUES,
	GET_PUBLISHED_COMMUNIQUE,
	PUBLISH_COMMUNIQUE
} from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const addCommunique = (communique = {}) => {
	return {
		type: ADD_COMMUNIQUE,
		payload: http.post('/announcements', communique)
	};
};
export const getCommuniques = () => {
	store.dispatch({
		type: GET_COMMUNIQUES,
		payload: http.get('/announcements')
	});
};
export const getPublishedCommunique = () => {
	store.dispatch({
		type: GET_PUBLISHED_COMMUNIQUE,
		payload: http.get('/announcements/published')
	});
};
export const publishCommunique = (communique) => {
	const { id, isPublished } = communique;
	return {
		type: PUBLISH_COMMUNIQUE,
		payload: http.patch(`/announcements/${id}/publish`, {
			isPublished
		})
	};
};
