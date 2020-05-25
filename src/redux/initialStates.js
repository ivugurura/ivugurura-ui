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
  topic: {},
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
  counts: {},
  published: [],
  publishedLoading: false,
  unPublished: [],
  unPublishedLoading: false,
};
