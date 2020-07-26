import { messages } from '../helpers/messages';

export const initialCategoryState = {
  navCategories: [],
  navLoading: false,
  categories: [],
  loading: false,
};
export const initialTopicState = {
  carsoulLoading: false,
  carsoulTopics: [],
  recentLoading: false,
  recentTopics: [],
  catgoryLoading: false,
  categoryTopics: [],
  allLoading: false,
  allTopics: [],
};
export const initialLangState = {
  locale: 'kn',
  messages: messages['kn'],
};
export const initialOneTopicState = {
  topic: { category: { relatedTopics: [] }, commentaries: [] },
  topicFetched: false,
  topicLoading: false,
  newTopicLoading: false,
  newTopicAdded: false,
  topicUpdating: false,
  topicUpdated: false,
};
export const initialFilerState = {
  uploadLoading: false,
  delLoading: false,
  deleteSuccess: false,
  coverImagePath: '',
  percent: 0,
};
export const initialUserState = {
  userLoading: false,
  isAuthenticated: false,
  userFetched: false,
  errorMesg: '',
  info: {},
};
export const initialDashState = {
  countLoading: false,
  counts: { songs: 0, videos: 0, published: 0, unPublished: 0 },
  published: [],
  publishedLoading: false,
  unPublished: [],
  unPublishedLoading: false,
};
export const initialCommentState = {
  commentLoading: false,
  commentAdded: false,
  newComment: {},
};
export const aCategoryState = {
  categoryFetched: false,
  categoryFetching: false,
  category: { parent: {} },
};
export const searchState = {
  searching: false,
  finished: false,
  results: {
    topics: [],
    categories: [],
  },
};
export const albumState = {
  albumAdding: false,
  albumAdded: false,
  albumsFetching: false,
  albumsFetched: false,
  albums: [],
};
export const mediaState = {
  medias: [],
  mediasFetching: false,
  mediasFetched: false,
  mediaAdding: false,
  mediaAdded: false,
};
export const addCommuniqueState = {
  communiqueAdding: false,
  communiqueAdded: false,
  communique: {},
};
export const getCommuniquesState = {
  communiquesFetching: false,
  communiquesFetched: false,
  communiques: [],
};
export const getPubCommuniquesState = {
  communiqueFetching: false,
  communiqueFetched: false,
  communique: null,
};
export const publishCommuniqueState = {
  publishing: false,
  published: false,
};
export const topicCommentsState = {
  commentsFetching: false,
  commentsFetched: false,
  comments: [],
};
export const publishCommentState = {
  loading: false,
  loaded: false,
};
