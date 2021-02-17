import { initialDashState } from '../initialStates';
import { pending, fulfilled, rejected } from '../../utils/actions';
import { GET_ADMIN_TOPICS, GET_DASHBOARD_COUNTS } from '../actions';

export const dashboardReducer = (state = initialDashState, action) => {
	switch (action.type) {
		case pending(GET_DASHBOARD_COUNTS):
			return {
				...state,
				countLoading: true
			};
		case fulfilled(GET_DASHBOARD_COUNTS):
			return {
				...state,
				countLoading: false,
				counts: action.payload.data.data
			};
		case pending(GET_ADMIN_TOPICS):
			return {
				...state,
				topicsLoading: true
			};
		case fulfilled(GET_ADMIN_TOPICS):
			return {
				...state,
				topicsLoading: false,
				topics: action.payload.data.data,
				totalItems: action.payload.data.totalItems
			};
		case rejected(GET_DASHBOARD_COUNTS):
		case rejected(GET_ADMIN_TOPICS):
		default:
			return {
				...state,
				topicsLoading: false,
				countLoading: false
			};
	}
};
