import {
	GET_NAVS_CATEGORIES,
	GET_CATEGORIES,
	GET_CATEGORY_DETAIL,
	ADD_NEW_CATEGORY
} from './actionTypes';
import { http } from '../../helpers';
import { store } from '../store';

export const getCategories = (categoryType) => {
	const actionType =
		categoryType === '/' ? GET_CATEGORIES : GET_NAVS_CATEGORIES;
	store.dispatch({
		type: actionType,
		payload: http.get(`/categories${categoryType}`)
	});
};
export const getCategoryDetail = (categorySlug) => {
	store.dispatch({
		type: GET_CATEGORY_DETAIL,
		payload: http.get(`/categories/${categorySlug}`)
	});
};
export const addCategory = (category = {}) => {
	let newCategory = category;
	if (!category.hasParent) {
		delete newCategory.categoryId;
	}
	delete newCategory.hasParent;
	store.dispatch({
		type: ADD_NEW_CATEGORY,
		payload: http.post(`/categories`, newCategory)
	});
};
