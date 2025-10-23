import { Card, CardContent, CardHeader, Skeleton } from '@mui/material';

export const TopicDetailSkeleton = () => (
  <Card sx={{ height: 600, width: '100%' }}>
    <CardHeader
      avatar={
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      }
      title={
        <Skeleton
          animation="wave"
          height={20}
          width="80%"
          style={{ marginBottom: 6 }}
        />
      }
      subheader={
        <Skeleton
          animation="wave"
          height={20}
          sx={{ width: { xs: '100%', md: '40%' } }}
        />
      }
    />
    <Skeleton sx={{ height: '70%' }} animation="wave" variant="rectangular" />
    <CardContent>
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton
          key={i}
          animation="wave"
          height={20}
          style={{ marginBottom: 6 }}
        />
      ))}
    </CardContent>
  </Card>
);
