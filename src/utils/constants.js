import moment from 'moment';

const flagUrl = `${process.env.PUBLIC_URL}/img/flags/16`;
const systemLanguage = localStorage.getItem('lang');
export const topicEditorButtons = [
  ['undo', 'redo'],
  ['font', 'fontSize', 'formatBlock'],
  //   ['paragraphStyle', 'blockquote'],
  ['bold', 'underline', 'italic'],
  ['fontColor', 'hiliteColor'],
  //   ['removeFormat'],
  ['outdent', 'indent'],
  // ['align', 'horizontalRule', 'list', 'lineHeight'],
  ['table', 'link'], //'image'
  ['fullScreen']
  //   ['preview', 'print'],
  // ['save', 'template'],
  // '/', Line break
];

export const systemLanguages = [
  {
    lang: 'Kinyarwanda',
    abbr: 'kn',
    flag: `${flagUrl}/RW.png`
  },
  {
    lang: 'English',
    abbr: 'en',
    flag: `${flagUrl}/GB.png`
  },
  {
    lang: 'French',
    abbr: 'fr',
    flag: `${flagUrl}/FR.png`
  },
  {
    lang: 'Kiswahili',
    abbr: 'sw',
    flag: `${flagUrl}/KE.png`
  }
];
export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};
export const formatDate = (theDate) => {
  const stringDate = moment(theDate).format('YYYY-MM-DD HH:mm');
  return stringDate;
};
export const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
export const currentLang = systemLanguages.find(
  (lang) => lang.abbr === systemLanguage
);
