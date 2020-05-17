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
  newTopicMesg: '',
};
export const initialFilerState = {
  uploadLoading: false,
  coverImagePath: '',
  percent: 0,
};
