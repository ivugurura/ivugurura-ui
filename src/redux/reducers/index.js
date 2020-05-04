import { combineReducers } from 'redux';
import { categoryReducer } from './categoryReducer';
import { languageReducer } from './languageReducer';

export default combineReducers({
  category: categoryReducer,
  language: languageReducer,
});
