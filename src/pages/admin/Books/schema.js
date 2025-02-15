export const bookInitials = {
  name: '',
  author: '',
  summary: '',
  categoryId: '',
};

export const bookSchema = (onHandleFileInputClick, categories = []) => [
  [{ name: 'name', label: 'Book name' }],
  [
    {
      name: 'categoryId',
      label: 'Book category',
      select: true,
      options: categories,
    },
    { name: 'author', label: 'Book author' },
  ],
  [
    {
      name: 'summary',
      label: 'Book summary',
      multiline: true,
      rows: 4,
    },
  ],
  [
    {
      label: 'Cover image',
      fieldType: 'file-field',
      type: 'bookCover',
      accept: '.jpeg, .png',
      onFirstExcute: () => onHandleFileInputClick('bookCover'),
    },
  ],
  [
    {
      label: 'Book file',
      fieldType: 'file-field',
      type: 'bookFile',
      accept: '.pdf',
      onFirstExcute: () => onHandleFileInputClick('bookFile'),
    },
  ],
];
