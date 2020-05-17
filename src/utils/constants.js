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
