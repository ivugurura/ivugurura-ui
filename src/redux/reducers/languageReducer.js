import { initialLangState } from '../../helpers';
import { SET_LANGUAGE } from '../actions';
import { messages } from '../../helpers/messages';

export const languageReducer = (state = initialLangState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      localStorage.setItem('lang', action.payload);
      return {
        ...state,
        messages: messages[action.payload],
      };
    default:
      return state;
  }
};
