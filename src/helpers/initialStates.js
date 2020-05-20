import { messages } from './messages';

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
  topicLoading: false,
  newTopicLoading: false,
  newTopicAdded: false,
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
