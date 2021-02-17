import { pending, rejected, fulfilled } from '../../utils/actions';
import { GET_CHAT_MESSAGES, GET_MESSAGES, SEND_CONTACT_US } from '../actions';

const initialState = {
	loading: false,
	loaded: false,
	message: '',
	messages: []
};
const initialUsersState = {
	loading: false,
	loaded: false,
	radioUsers: []
};
export const contactUsReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(SEND_CONTACT_US):
			return {
				...state,
				loading: true
			};
		case fulfilled(SEND_CONTACT_US):
			return {
				...state,
				loading: false,
				loaded: true,
				message: action.payload.data.message
			};
		case rejected(SEND_CONTACT_US):
		default:
			return {
				...state,
				loading: false,
				loaded: false
			};
	}
};
export const chatGetReducer = (state = initialState, action) => {
	switch (action.type) {
		case pending(GET_MESSAGES):
			return {
				...state,
				loaded: false,
				loading: true
			};
		case fulfilled(GET_MESSAGES):
			return {
				...state,
				loaded: true,
				loading: false,
				messages: action.payload.data.data
			};
		case rejected(GET_MESSAGES):
		default:
			return {
				...state,
				loading: false
			};
	}
};
export const chatUsersGetReducer = (state = initialUsersState, action) => {
	switch (action.type) {
		case pending(GET_CHAT_MESSAGES):
			return {
				...state,
				loaded: false,
				loading: true
			};
		case fulfilled(GET_CHAT_MESSAGES):
			return {
				...state,
				loaded: true,
				loading: false,
				radioUsers: action.payload.data.data
			};
		case rejected(GET_CHAT_MESSAGES):
		default:
			return {
				...state,
				loading: false
			};
	}
};
