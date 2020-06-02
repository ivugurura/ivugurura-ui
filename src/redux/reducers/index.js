import { combineReducers } from 'redux';
import { categoryReducer } from './categoryReducer';
import { languageReducer } from './languageReducer';
import { topicReducer } from './topicReducer';
import { oneTopicReducer } from './oneTopicReducer';
import { filerReducer } from './filerReducer';
import { useReducer } from './userReducer';
import { dashboardReducer } from './dashboardReducer';
import { commentReducer } from './commentReducer';

export default combineReducers({
  category: categoryReducer,
  language: languageReducer,
  topic: topicReducer,
  oneTopic: oneTopicReducer,
  filer: filerReducer,
  user: useReducer,
  dashboard: dashboardReducer,
  comment: commentReducer,
});
