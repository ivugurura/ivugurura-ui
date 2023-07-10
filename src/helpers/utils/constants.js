import moment from 'moment';
import { toast } from 'react-toastify';

const flagUrl = `${process.env.PUBLIC_URL}/img/flags/16`;

export const systemLanguage = localStorage.getItem('lang') || 'kn';

export const toLink = (link = '') => `/${systemLanguage}/${link}`;

export const topicEditorButtons = [
  ['undo', 'redo'],
  ['font', 'fontSize', 'formatBlock'],
  //   ['paragraphStyle', 'blockquote'],
  ['bold', 'underline', 'italic'],
  ['fontColor', 'hiliteColor'],
  //   ['removeFormat'],
  ['outdent', 'indent'],
  // ['align', 'horizontalRule', 'list', 'lineHeight'],
  ['table', 'link'], // 'image'
  ['fullScreen'],
  //   ['preview', 'print'],
  // ['save', 'template'],
  // '/', Line break
];

export const systemLanguages = [
  {
    lang: 'Kinyarwanda',
    abbr: 'kn',
    flag: `${flagUrl}/RW.png`,
  },
  {
    lang: 'English',
    abbr: 'en',
    flag: `${flagUrl}/GB.png`,
  },
  {
    lang: 'French',
    abbr: 'fr',
    flag: `${flagUrl}/FR.png`,
  },
  {
    lang: 'Kiswahili',
    abbr: 'sw',
    flag: `${flagUrl}/KE.png`,
  },
];
export const truncate = (str = '', n = 1) => (str.length > n ? `${str.substr(0, n - 1)}...` : str);
export const formatDate = (theDate) => {
  const stringDate = moment(theDate).format('YYYY-MM-DD HH:mm');
  return stringDate;
};
export const getRole = (accessLevel = '3') => {
  let role = 'Editor';
  if (Number(accessLevel) === 2) role = 'Admin';
  return role;
};
export const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
export const currentLang = systemLanguages.find(
  (lang) => lang.abbr === systemLanguage,
);
export const USER_LISTENER = 'user-listener';
export const CHAT_ROOM = '';
export const currentYear = new Date().getFullYear();
export const socialMedias = [
  {
    name: 'Facebook',
    url: 'https://web.facebook.com/ivugurura.ubugorozi.10',
    faIcon: 'facebook',
    classeName: 'icoFacebook',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/reformation_voice',
    faIcon: 'instagram',
    classeName: 'icoInstagram',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/Rev_Reformation',
    faIcon: 'twitter',
    classeName: 'icoTwitter',
  },
];

export const IMAGE_PATH = `${process.env.REACT_APP_API_URL}/images`;

const messageId = 13;
export const notifier = {
  error: (msg) => toast(msg, {
    type: toast.TYPE.ERROR,
    position: toast.POSITION.BOTTOM_RIGHT,
    toastId: messageId,
  }),
  success: (msg) => toast(msg, {
    type: toast.TYPE.DEFAULT,
    position: toast.POSITION.BOTTOM_LEFT,
    toastId: messageId,
  }),
};
