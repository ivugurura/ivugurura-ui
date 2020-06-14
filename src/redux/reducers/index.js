import { combineReducers } from 'redux';
import { categoryReducer } from './categoryReducer';
import { languageReducer } from './languageReducer';
import { topicReducer } from './topicReducer';
import { oneTopicReducer } from './oneTopicReducer';
import { filerReducer } from './filerReducer';
import { useReducer } from './userReducer';
import { dashboardReducer } from './dashboardReducer';
import { commentReducer } from './commentReducer';
import { oneCategoryReducer } from './oneCategoryReducer';
import { searchReducer } from './searchReducer';
import { albumReducer } from './albumReducer';
import { mediaReducer } from './mediaReducer';

export default combineReducers({
  category: categoryReducer,
  language: languageReducer,
  topic: topicReducer,
  oneTopic: oneTopicReducer,
  filer: filerReducer,
  user: useReducer,
  dashboard: dashboardReducer,
  comment: commentReducer,
  oneCategory: oneCategoryReducer,
  search: searchReducer,
  album: albumReducer,
  media: mediaReducer,
});
