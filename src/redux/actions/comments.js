import {
	ADD_COMMENT,
	GET_TOPICS_COMMENTS,
	GET_COMMENTS_ADMIN,
	PUBLISH_COMMENT,
	RESET_PUBLISH_COMMENT,
	RESET_ADD_COMMENT
} from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const addTopicComment = (commentBody, topicSlug) => {
	const commentUrl = `/topics/${topicSlug}/comments`;
	return {
		type: ADD_COMMENT,
		payload: http.post(commentUrl, commentBody)
	};
};
export const getTopicsComments = (topicSlug) => {
	const commentUrl = `/topics/${topicSlug}/comments`;
	return {
		type: GET_TOPICS_COMMENTS,
		payload: http.get(commentUrl)
	};
};
export const getAdminComments = (page = 1, pageSize = 10) => {
	const params = `page=${page}&pageSize=${pageSize}`;
	store.dispatch({
		type: GET_COMMENTS_ADMIN,
		payload: http.get(`/topics/comments/all?${params}`)
	});
};
export const publishAComment = (commentId = '') => {
	store.dispatch({
		type: PUBLISH_COMMENT,
		payload: http.put(`/topics/publish/comments/${commentId}`)
	});
};
export const resetPublisheComment = () => {
	store.dispatch({
		type: RESET_PUBLISH_COMMENT
	});
};
export const resetAddComment = () => {
	store.dispatch({
		type: RESET_ADD_COMMENT
	});
};
