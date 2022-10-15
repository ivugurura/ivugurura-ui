import { store } from '../store';
import { http } from '../../helpers';
import {
  SEND_CONTACT_US,
  SEARCH_QUERY,
  GET_MESSAGES,
  GET_CHAT_MESSAGES,
  GET_YOUTUBE_VIDEOS,
} from './actionTypes';

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
export const getMessages = (userId = '') => {
  const params = userId !== '' ? `?listenerId=${userId}` : '';
  store.dispatch({
    type: GET_MESSAGES,
    payload: http.get(`/manage/messages${params}`),
  });
};
export const getChatUsers = () => {
  store.dispatch({
    type: GET_CHAT_MESSAGES,
    payload: http.get('/manage/chat-users'),
  });
};

export const getYoutubeVideos = (params = {}) => {
  store.dispatch({
    type: GET_YOUTUBE_VIDEOS,
    payload: http.get('/youtube', { params }),
  });
};
