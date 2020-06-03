import moment from 'moment';

export const topicEditorButtons = [
  ['undo', 'redo'],
  ['font', 'fontSize', 'formatBlock'],
  //   ['paragraphStyle', 'blockquote'],
  ['bold', 'underline', 'italic'],
  ['fontColor', 'hiliteColor'],
  //   ['removeFormat'],
  ['outdent', 'indent'],
  // ['align', 'horizontalRule', 'list', 'lineHeight'],
  // ['table', 'link', 'image', 'video', 'math'],
  ['fullScreen'],
  //   ['preview', 'print'],
  // ['save', 'template'],
  // '/', Line break
];

export const systemLanguages = [
  {
    lang: 'Kinyarwanda',
    abbr: 'kn',
  },
  {
    lang: 'English',
    abbr: 'en',
  },
];
export const truncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + '...' : str;
};
export const formatDate = (theDate) => {
  const stringDate = moment(theDate).format('YYYY-MM-DD HH:mm');
  return stringDate;
};
export const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);
