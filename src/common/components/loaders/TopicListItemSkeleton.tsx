import React from 'react';

import { Card, CardHeader, Skeleton } from '@mui/material';

interface TopicListItemSkeletonProps {
  totalItem?: number;
}

export const TopicListItemSkeleton: React.FC<TopicListItemSkeletonProps> = ({
  totalItem = 1,
}) => (
  <Card sx={{ width: '100%' }}>
    {Array.from({ length: totalItem }, (_, i) => (
      <CardHeader
        key={i}
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={40}
            height={40}
          />
        }
        title={
          <Skeleton animation="wave" height={15} style={{ marginBottom: 6 }} />
        }
        subheader={<Skeleton animation="wave" height={15} width="40%" />}
      />
    ))}
  </Card>
);
