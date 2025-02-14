export const bookInitials = {
  title: '',
  author: '',
  cover: '',
  description: '',
  categoryId: '',
};

export const bookSchema = (onHandleFileInputClick, categories = []) => [
  [{ name: 'title', label: 'Book title' }],
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
      name: 'description',
      label: 'Book description',
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
