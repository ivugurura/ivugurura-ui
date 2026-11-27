import React from 'react';

import {
  Card,
  CardContent,
  Grid,
  Skeleton,
  type GridSize,
} from '@mui/material';

interface TopicsCardSkeletonProps {
  totalItems?: number;
  itemsSize?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', GridSize>>;
}

export const TopicsCardSkeleton: React.FC<TopicsCardSkeletonProps> = ({
  totalItems = 3,
  itemsSize = { md: 4, xs: 12 },
}) => (
  <Grid container spacing={2}>
    {Array.from({ length: totalItems }, (_, i) => (
      <Grid size={itemsSize} key={i}>
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
