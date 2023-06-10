// import { combineReducers } from 'redux';
import { albumReducer } from './albumReducer';
import { categoryAddReducer, categoryReducer } from './categoryReducer';
import {
  commentReducer,
  commentsTopicReducer,
  adminCommentsReducer,
  publishCommentReducer,
} from './commentReducer';
import {
  addCommuniqueReducer,
  getCommuniquesReducer,
  getPubCommuniqueReducer,
  publishCommuniqueReducer,
} from './communiqueReducer';
import { dashboardReducer } from './dashboardReducer';
import { filePathReducer, filerReducer } from './filerReducer';
import { languageReducer } from './languageReducer';
import {
  coverImagesGetReducer,
  mediaCountReducer,
  mediaReducer,
  songDelReducer,
  songEditReducer,
  songShareReducer,
} from './mediaReducer';
import { oneCategoryReducer } from './oneCategoryReducer';
import {
  topicAddReducer,
  topicEditReducer,
  topicGetReducer,
} from './oneTopicReducer';
import { searchReducer } from './searchReducer';
import { topicReducer } from './topicReducer';
import {
  logoutUserReducer,
  userAddReducer,
  userEditReducer,
  useReducer,
  userRmReducer,
  usersGetReducer,
} from './userReducer';
import {
  chatGetReducer,
  chatUsersGetReducer,
  contactUsReducer,
  youtubeVideosGetReducer,
} from './utilReducer';

export const rootReducer = {
  category: categoryReducer,
  language: languageReducer,
  topic: topicReducer,
  topicGet: topicGetReducer,
  topicAdd: topicAddReducer,
  topicEdit: topicEditReducer,
  filer: filerReducer,
  user: useReducer,
  lgUser: logoutUserReducer,
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
  categoryAdd: categoryAddReducer,
  chatGet: chatGetReducer,
  chatUsersGet: chatUsersGetReducer,
  songDel: songDelReducer,
  songEdit: songEditReducer,
  filePath: filePathReducer,
  usersGet: usersGetReducer,
  userAdd: userAddReducer,
  userEdit: userEditReducer,
  userRm: userRmReducer,
  songShare: songShareReducer,
  mediaCount: mediaCountReducer,
  coverImagesGet: coverImagesGetReducer,
  youtubeVideosGet: youtubeVideosGetReducer,
};
