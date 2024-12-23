export const commentSchema = (t) => [
  [
    {
      name: 'names',
      label: t('fields.names'),
    },
    {
      name: 'email',
      label: t('fields.email'),
    },
  ],
  [
    {
      name: 'website',
      label: t('fields.website'),
    },
  ],
  [
    {
      name: 'content',
      label: t('fields.commentBody'),
      multiline: true,
      rows: 5,
    },
  ],
];

export const commentState = {
  content: '',
  names: '',
  email: '',
  website: '',
};
