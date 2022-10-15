import { SET_LANGUAGE } from './actionTypes';

export const setLanguage = (newLanguage) => {
  return {
    type: SET_LANGUAGE,
    payload: newLanguage,
  };
};
