import React from 'react';

import {
  Delete as DeleteIcon,
  EditNoteOutlined as EditIcon,
  ViewAgendaOutlined as ViewIcon,
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';

import { BOOK_COVERS_PATH } from '../../helpers/utils/constants';

export const BooksList = ({ books = [], onBookClick = () => {} }) => (
  <Container sx={{ py: 4 }}>
    <Typography variant="h4" gutterBottom>
      Book Collection
    </Typography>
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item xs={12} sm={6} md={4} key={book.id}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardMedia
              component="img"
              height="300"
              image={`${BOOK_COVERS_PATH}/${book.coverImage}`}
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
            <CardActions>
              <Button
                size="small"
                startIcon={<ViewIcon />}
                onClick={() => onBookClick(book, 'read')}
              >
                Read
              </Button>
              <Button size="small" startIcon={<EditIcon />}>
                Edit
              </Button>
              <Button
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => onBookClick(book, 'delete')}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);
