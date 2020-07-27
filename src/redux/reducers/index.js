import { combineReducers } from 'redux';
import { categoryReducer } from './categoryReducer';
import { languageReducer } from './languageReducer';
import { topicReducer } from './topicReducer';
import { oneTopicReducer } from './oneTopicReducer';
import { filerReducer } from './filerReducer';
import { useReducer } from './userReducer';
import { dashboardReducer } from './dashboardReducer';
import {
  commentReducer,
  commentsTopicReducer,
  adminCommentsReducer,
  publishCommentReducer,
} from './commentReducer';
import { oneCategoryReducer } from './oneCategoryReducer';
import { searchReducer } from './searchReducer';
import { albumReducer } from './albumReducer';
import { mediaReducer } from './mediaReducer';
import {
  addCommuniqueReducer,
  getCommuniquesReducer,
  getPubCommuniqueReducer,
  publishCommuniqueReducer,
} from './communiqueReducer';
import { contactUsReducer } from './utilReducer';

export const rootReducer = combineReducers({
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
  communiqueAdd: addCommuniqueReducer,
  communiqueGet: getCommuniquesReducer,
  communiquePub: getPubCommuniqueReducer,
  communiquePublish: publishCommuniqueReducer,
  topicComments: commentsTopicReducer,
  adminComments: adminCommentsReducer,
  publishComment: publishCommentReducer,
  contactUs: contactUsReducer,
});
