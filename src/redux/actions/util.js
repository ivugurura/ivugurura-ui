import { store } from '../store';
import { http } from '../../helpers';
import { SEND_CONTACT_US, SEARCH_QUERY } from './actionTypes';

export const searchQuery = (input) => {
  store.dispatch({
    type: SEARCH_QUERY,
    payload: http.get(`/manage/search?searchKey=${input}`),
  });
};

export const sendContactUs = (contactInfo) => {
  store.dispatch({
    type: SEND_CONTACT_US,
    payload: http.post('/manage/contact-us', contactInfo),
  });
};
