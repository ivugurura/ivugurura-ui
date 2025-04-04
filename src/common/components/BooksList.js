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

import { BOOK_COVERS_PATH } from '../../helpers/utils/constants';

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
}) => (
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
          onClick={() => onBookClick(book)}
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
              by Ivugurura n Ubugorozi
            </Typography>
          </CardContent>
          {isAdmin && (
            <CardActions>
              <Button
                size="small"
                color="primary"
                startIcon={<ViewIcon />}
                onClick={() => onBookClick(book, 'read')}
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
