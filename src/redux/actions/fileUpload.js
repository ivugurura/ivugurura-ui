import {
	UPLOAD_FILE,
	SET_UPLOADED_PCT,
	DELETE_FILE,
	SET_FILE_PATH,
	RESET_FILE_PATH
} from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const setUploadedPct = (pct) => {
	return {
		type: SET_UPLOADED_PCT,
		payload: pct
	};
};
export const uploadFile = (fileData, type = 'image', prevFile = '') => {
	const config = {
		headers: { 'Content-Type': 'multipart/form-data' }
	};
	const uploadUrl = `/albums/upload/${type}?prevFile=${prevFile}`;
	return {
		type: UPLOAD_FILE,
		payload: http.post(uploadUrl, fileData, config)
	};
};
export const deleteFile = (fileType, fileName) => {
	const pathUrl = `${fileType}/${fileName}`;
	return {
		type: DELETE_FILE,
		payload: http.delete(`/albums/${pathUrl}`)
	};
};
export const setFilePath = (filePathName = '') => {
	store.dispatch({
		type: SET_FILE_PATH,
		payload: filePathName
	});
};
export const resetFilePath = () => {
	store.dispatch({
		type: RESET_FILE_PATH
	});
};
