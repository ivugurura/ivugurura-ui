import { Box, Chip, Grid, Skeleton, Typography } from '@mui/material';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { toAssetPath, toLink } from '../../../../helpers/utils/constants';

import { sharedStyles as s } from './styles';

export const FeaturedCard = ({ topic }) => (
  <Box component={Link} to={toLink(`topics/${topic.slug}`)} sx={s.featuredCard}>
    <Box
      component="img"
      src={toAssetPath(topic.coverImage)}
      alt={topic.title}
      sx={s.featuredImage}
    />
    <Box className="featured-overlay" sx={s.featuredOverlay} />
    <Box sx={s.featuredContent}>
      <Chip label="Featured" size="small" sx={s.featuredChip} />
      <Typography
        className="featured-title"
        variant="h5"
        fontWeight={700}
        sx={s.featuredTitle}
      >
        {topic.title}
      </Typography>
      {topic.content && (
        <Typography variant="body2" sx={s.featuredSummary}>
          {topic.content}
        </Typography>
      )}
      <Typography variant="caption" sx={s.featuredDate}>
        {moment(topic.updatedAt).format('DD MMM YYYY')}
      </Typography>
    </Box>
  </Box>
);

export const SmallCard = ({ topic }) => (
  <Box
    component={Link}
    to={toLink(`topics/${topic.slug}`)}
    sx={s.smallCardLink}
  >
    <Box
      component="img"
      src={toAssetPath(topic.coverImage)}
      alt={topic.title}
      sx={s.smallCardImage}
    />
    <Box sx={{ overflow: 'hidden' }}>
      <Typography
        className="small-title"
        variant="body1"
        fontWeight={600}
        sx={s.smallCardTitle}
      >
        {topic.title}
      </Typography>
      {topic.content && (
        <Typography variant="body2" sx={s.smallCardSummary}>
          {topic.content}
        </Typography>
      )}
      <Typography variant="caption" sx={s.smallCardDate}>
        {moment(topic.updatedAt).format('DD MMM YYYY')}
      </Typography>
    </Box>
  </Box>
);

export const LoadingSkeleton = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={7}>
      <Skeleton variant="rounded" height={460} sx={{ borderRadius: 3 }} />
    </Grid>
    <Grid item xs={12} md={5}>
      <Grid container spacing={2}>
        {[...Array(6)].map((_, i) => (
          <Grid key={i} item xs={12} sm={6}>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

export const SideTopicsGrid = ({ topics }) => (
  <Grid container spacing={2}>
    {topics.map((topic) => (
      <Grid key={topic.slug} item xs={12} sm={6}>
        <Box sx={s.sideCard}>
          <Box sx={s.sideCardContent}>
            <SmallCard topic={topic} />
          </Box>
        </Box>
      </Grid>
    ))}
  </Grid>
);
