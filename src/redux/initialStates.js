import { messages } from '../helpers/messages';

export const baseState = (key = 'data', value = null) => {
	return {
		loading: true,
		done: false,
		[key]: value,
		totalItems: 0
	};
};
export const initialCategoryState = {
	navCategories: [],
	navLoading: false,
	categories: [],
	loading: false
};
export const initialTopicState = {
	carsoulLoading: false,
	carsoulTopics: [],
	recentLoading: false,
	recentTopics: [],
	catgoryLoading: false,
	fetched: false,
	categoryTopics: [],
	allLoading: false,
	allTopics: [],
	totalItems: 0
};
export const initialLangState = {
	locale: 'kn',
	messages: messages['kn']
};
export const initialOneTopicState = {
	topic: { category: { relatedTopics: [] }, commentaries: [] },
	topicFetched: false,
	topicLoading: false,
	newTopicLoading: false,
	newTopicAdded: false,
	topicUpdating: false,
	topicUpdated: false
};
export const initialFilerState = {
	uploadLoading: false,
	uploaded: false,
	delLoading: false,
	deleteSuccess: false,
	coverImagePath: '',
	percent: 0
};
export const initialUserState = {
	userLoading: false,
	isAuthenticated: false,
	userFetched: false,
	errorMesg: '',
	info: {}
};
export const initialDashState = {
	countLoading: false,
	counts: {
		songs: 0,
		videos: 0,
		published: 0,
		unPublished: 0,
		commentaries: 0,
		users: 0
	},
	topics: [],
	topicsLoading: false,
	totalItems: 0
};
export const initialCommentState = {
	commentLoading: false,
	commentAdded: false,
	newComment: {}
};
export const aCategoryState = {
	categoryFetched: false,
	categoryFetching: false,
	category: { parent: {} }
};
export const searchState = {
	searching: false,
	finished: false,
	results: {
		topics: [],
		categories: []
	}
};
export const albumState = {
	albumAdding: false,
	albumAdded: false,
	albumsFetching: false,
	albumsFetched: false,
	albums: []
};
export const mediaState = {
	medias: [],
	mediasFetching: false,
	mediasFetched: false,
	mediaAdding: false,
	mediaAdded: false,
	totalItems: 0
};
export const addCommuniqueState = {
	communiqueAdding: false,
	communiqueAdded: false,
	communique: {}
};
export const getCommuniquesState = {
	communiquesFetching: false,
	communiquesFetched: false,
	communiques: []
};
export const getPubCommuniquesState = {
	communiqueFetching: false,
	communiqueFetched: false,
	communique: {}
};
export const publishCommuniqueState = {
	publishing: false,
	published: false
};
export const topicCommentsState = {
	commentsFetching: false,
	commentsFetched: false,
	comments: [],
	totalItems: 0
};
export const publishCommentState = {
	loading: false,
	loaded: false
};
