import { baseState, mediaState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { GET_MEDIAS, ADD_NEW_MEDIA, DELETE_SONG, EDIT_SONG } from '../actions';

export const mediaReducer = (state = mediaState, action) => {
	switch (action.type) {
		case pending(GET_MEDIAS):
			return {
				...state,
				mediasFetching: true
			};
		case pending(ADD_NEW_MEDIA):
			return {
				...state,
				mediaAdding: true,
				mediaAdded: false
			};
		case fulfilled(GET_MEDIAS):
			return {
				...state,
				mediasFetching: false,
				mediasFetched: true,
				medias: action.payload.data.data
			};
		case fulfilled(ADD_NEW_MEDIA):
			return {
				...state,
				mediaAdding: false,
				mediaAdded: true
			};
		case rejected(GET_MEDIAS):
		case rejected(ADD_NEW_MEDIA):
		default:
			return {
				...state,
				mediaAdding: false,
				mediasFetching: false
			};
	}
};
export const songDelReducer = (state = baseState('message', ''), action) => {
	switch (action.type) {
		case pending(DELETE_SONG):
			return {
				...state,
				loaded: false,
				loading: true
			};
		case fulfilled(DELETE_SONG):
			return {
				...state,
				loading: false,
				loaded: true,
				message: action.payload.data.message
			};
		case rejected(DELETE_SONG):
		default:
			return {
				...state,
				loading: false
			};
	}
};
export const songEditReducer = (state = baseState('message', ''), action) => {
	switch (action.type) {
		case pending(EDIT_SONG):
			return {
				...state,
				loaded: false,
				loading: true
			};
		case fulfilled(EDIT_SONG):
			return {
				...state,
				loading: false,
				loaded: true,
				message: action.payload.data.message
			};
		case rejected(EDIT_SONG):
		default:
			return {
				...state,
				loading: false
			};
	}
};
