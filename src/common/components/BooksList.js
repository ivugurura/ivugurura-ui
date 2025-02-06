import React from 'react';

import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from '@mui/material';

export const BooksList = ({ books = [], onBookClick }) => (
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
            onClick={onBookClick}
          >
            <CardMedia
              component="img"
              height="300"
              image={book.coverImage}
              alt={book.title}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="div">
                {book.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                by {book.author}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>
);
