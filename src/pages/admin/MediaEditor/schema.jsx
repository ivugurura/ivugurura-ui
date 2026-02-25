import { FormControl, MenuItem, Select, TextField } from '@mui/material';

export const mediaSchema = (albums = []) => [
  [
    {
      label: 'Media title',
      name: 'title',
    },
  ],
  [
    {
      label: 'Media type',
      name: 'type',
      select: true,
      options: [{ id: 'audio', name: 'Audio' }],
    },
    {
      label: 'Media album',
      name: 'albumId',
      select: true,
      options: albums,
    },
  ],
  [
    {
      label: 'Author',
      name: 'author',
    },
    {
      label: 'Action date',
      name: 'actionDate',
      type: 'date',
    },
  ],
  [
    {
      label: 'Media file',
      fieldType: 'file-field',
      type: 'song',
      accept: '.mp3, .m4a',
    },
  ],
];

export const audioColumns = () => [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'type', header: 'Type', size: 1 },
  { accessorKey: 'author', header: 'Author' },
  { accessorKey: 'downloads', header: 'Downloads' },
  { accessorKey: 'shares', header: 'Shares' },
  { accessorKey: 'createdAt', header: 'Date' },
  { accessorKey: 'actions', header: 'Actions' },
];

export const allAudioColumns = (inputChange, languages, albums) => [
  { id: 'fileName', accessorKey: 'fileName', header: 'File name' },
  {
    id: 'title',
    header: 'Title',
    Cell: ({ row: { original } }) => {
      return (
        <TextField
          id="title"
          size="small"
          name="title"
          value={original.title || ''}
          onChange={inputChange(original, 'title')}
        />
      );
    },
  },
  {
    id: 'languageId',
    header: 'Language',
    Cell: ({ row: { original } }) => (
      <FormControl size="small">
        <Select
          labelId="lang-selector-label"
          id="lang-selector"
          value={original.languageId || ''}
          onChange={inputChange(original, 'languageId')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {languages.map((l) => (
            <MenuItem key={l.id} value={l.id}>
              {l.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
  },
  {
    id: 'author',
    header: 'Author',
    Cell: ({ row: { original } }) => (
      <TextField
        id="author"
        size="small"
        name="author"
        value={original.author || ''}
        onChange={inputChange(original, 'author')}
      />
    ),
  },
  {
    id: 'albumId',
    header: 'Album',
    Cell: ({ row: { original } }) => (
      <FormControl size="small">
        <Select
          labelId="album-selector-label"
          id="album-selector"
          value={original.albumId || ''}
          onChange={inputChange(original, 'albumId')}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {albums.map((a) => (
            <MenuItem key={a.id} value={a.id}>
              {a.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    ),
  },
];
