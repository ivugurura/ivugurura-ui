import React from 'react';

import { Card, Grid, CardContent, Skeleton } from '@mui/material';

export const TopicsCardSkeleton = ({
  totalItems = 3,
  itemsSize = { md: 4, xs: 12 },
}) => (
  <Grid container spacing={2}>
    {Array.from({ length: totalItems }, (_, i) => (
      <Grid item {...itemsSize} key={i}>
        <Card sx={{ width: '100%' }}>
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />

          <CardContent>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);
