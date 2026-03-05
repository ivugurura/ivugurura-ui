import React from 'react';

import {
  Delete as DeleteIcon,
  LockOutlined as LockIcon,
  ViewAgendaOutlined as ViewIcon,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { BOOK_COVERS_PATH, toLink } from '../../helpers/utils/constants';

import { RRVDownloadBtn } from './RRVDownloadBtn';

interface BooksListProps {
  books?: APP.IBook[];
  onBookClick?: (book: APP.IBook, action: 'delete' | 'edit' | 'view') => void;
  isAdmin?: boolean;
}
const getCoverImage = (img) => {
  let cover = `${BOOK_COVERS_PATH}/${img}`;
  if (!img) {
    cover = '/img/book-thumbnail.svg';
  }
  return cover;
};

export const BooksList: React.FC<BooksListProps> = ({
  books = [],
  onBookClick,
  isAdmin = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleReadBook = (book: APP.IBook) => {
    navigate(toLink(`library/${book.slug}`, isAdmin));
  };

  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
            }}
            onClick={() => handleReadBook(book)}
          >
            <CardMedia
              component="img"
              height="300"
              image={getCoverImage(book.coverImage)}
              alt={book.name}
            />
            <CardContent sx={{ p: 1.5 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 1,
                }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {book.name}
                </Typography>
                {book.isDownloadable ? (
                  <RRVDownloadBtn
                    useMutation="useDownloadBookMutation"
                    params={{ id: book.id, fileName: book.name }}
                    hideBtntext
                  />
                ) : (
                  <IconButton
                    aria-label="locked"
                    disabled
                    onClick={(event) => event.stopPropagation()}
                  >
                    <LockIcon />
                  </IconButton>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary">
                {`${t('by')} ${t('subtitle')}`}
              </Typography>
            </CardContent>
            {isAdmin && (
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  startIcon={<ViewIcon />}
                  onClick={() => handleReadBook(book)}
                >
                  Read
                </Button>
                {/* <Button size="small" startIcon={<EditIcon />}>
                  Edit
                </Button> */}
                <Button
                  size="small"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => onBookClick(book, 'delete')}
                >
                  Delete
                </Button>
              </CardActions>
            )}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
