import React from 'react';

import {
  Delete as DeleteIcon,
  // EditNoteOutlined as EditIcon,
  ViewAgendaOutlined as ViewIcon,
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { BOOK_COVERS_PATH, toLink } from '../../helpers/utils/constants';

const getCoverImage = (img) => {
  let cover = `${BOOK_COVERS_PATH}/${img}`;
  if (!img) {
    cover = '/img/book-thumbnail.svg';
  }
  return cover;
};
export const BooksList = ({
  books = [],
  onBookClick = () => {},
  isAdmin = false,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleReadBook = (book) => {
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
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {book.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {`${t('by')} ${t('subtitle')}}`}
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
