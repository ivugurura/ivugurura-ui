export const commentSchema = () => [
  [{
    name: 'content',
    label: 'Comment',
    multiline: true,
    rows: 5,
  }],
  [{
    name: 'names',
    label: 'Names',
  }, {
    name: 'email',
    label: 'E-mail',
  }, {
    name: 'website',
    label: 'Website',
  }],
];
