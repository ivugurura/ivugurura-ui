import { Facebook, Instagram, X } from '@mui/icons-material';
import CryptoJS from 'crypto-js';
import moment from 'moment';
import { toast } from 'react-toastify';

const flagUrl = `/img/flags/16`;

export const systemLanguage = localStorage.getItem('i18nextLng') ?? 'en';
export const isAdminUrl = () => {
  const { pathname } = window.location;
  const urls = ['login', 'admin', 'privacy-policy'];
  return urls.some((url) => pathname.includes(url));
};

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
    lang: 'Ikinyarwanda',
    abbr: 'kn',
    flag: `${flagUrl}/RW.png`,
  },
  {
    lang: 'English',
    abbr: 'en',
    flag: `${flagUrl}/GB.png`,
  },
  {
    lang: 'Français',
    abbr: 'fr',
    flag: `${flagUrl}/FR.png`,
  },
  {
    lang: 'Swahili',
    abbr: 'sw',
    flag: `${flagUrl}/KE.png`,
  },
];

/**
 * Roles
 */
export const systemRoles = { superAdmin: 1, admin: 2, editor: 3 };
export const truncate = (str = '', n = 1) =>
  str.length > n ? `${str.substr(0, n - 1)}...` : str;
export const formatDate = (theDate: unknown) => {
  const stringDate = moment(theDate).format('YYYY-MM-DD HH:mm');
  return stringDate;
};
export const getRole = (accessLevel = '3') => {
  let role = 'Editor';
  if (Number(accessLevel) === 2) role = 'Admin';
  return role;
};
export const scrollToRef = (ref: React.RefObject<HTMLElement>) =>
  window.scrollTo(0, ref.current?.offsetTop || 0);
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
    icon: Facebook,
    classeName: 'icoFacebook',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/reformation_voice',
    icon: Instagram,
    classeName: 'icoInstagram',
  },
  {
    name: 'X',
    url: 'https://x.com/Rev_Reformation',
    icon: X,
    classeName: 'icoTwitter',
  },
];

export const IMAGE_PATH = `${import.meta.env.VITE_API_URL}/images`;
export const AUDIO_PATH = `${import.meta.env.VITE_API_URL}/songs`;
export const BOOK_COVERS_PATH = `${import.meta.env.VITE_API_URL}/covers`;
export const toLink = (link = '', isAdmin = false) =>
  `${isAdmin ? '/admin/' : '/'}${systemLanguage}/${link}`;
export const toAssetPath = (name = '', isImage = true) =>
  `${isImage ? IMAGE_PATH : AUDIO_PATH}/${name}`;
export const DL_ROUTE = `${import.meta.env.VITE_API_URL}/api/v1/albums/download/`;
export const MAIN_URL = import.meta.env.VITE_API_URL as string;

export const lStorage = {
  token: localStorage.getItem('user-token') || '',
};

const messageId = 13;
export const notifier = {
  error: (msg: string) =>
    toast.error(msg, {
      position: 'bottom-right',
      toastId: messageId,
    }),
  success: (msg: string) =>
    toast(msg, {
      position: 'bottom-left',
      toastId: messageId,
    }),
};
export const dateFormat = (value: unknown) =>
  moment(value).format('DD MMMM YYYY');

export const generateSignature = () => {
  const apiKey = 'your-secret-key';
  const timestamp = Math.floor(Date.now() / 1000);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const hash = CryptoJS.HmacSHA256(String(timestamp), apiKey).toString(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    CryptoJS.enc.Hex,
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return { timestamp, hash };
};
