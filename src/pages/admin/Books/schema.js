export const bookInitials = {
  name: '',
  author: '',
  summary: '',
  categoryId: '',
  isDownloadable: false,
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
      name: 'isDownloadable',
      label: 'Will the book be downloadable?',
      fieldType: 'switch-field',
      isBool: true,
    },
  ],
  [
    {
      label: 'Cover image',
      fieldType: 'file-field',
      type: 'bookCover',
      accept: '.jpeg, .png',
      placeholder: 'Upload the book cover',
      imgProps: {
        height: 216,
        width: 144,
        bRadius: 5,
        zoom: 0.2,
      },
      onFirstExcute: () => onHandleFileInputClick('bookCover'),
    },
  ],
  [
    {
      label: 'Book file',
      fieldType: 'file-field',
      type: 'bookFile',
      placeholder: 'Add the book file',
      accept: '.pdf',
      onFirstExcute: () => onHandleFileInputClick('bookFile'),
    },
  ],
];
