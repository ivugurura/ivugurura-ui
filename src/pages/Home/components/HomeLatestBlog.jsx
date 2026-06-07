import { ArrowOutward } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Skeleton, Typography } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { toAssetPath, toLink } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { styles } from './HomeLatestBlog.style';

const FeaturedCard = ({ topic }) => (
  <Box component={Link} to={toLink(`topics/${topic.slug}`)} sx={styles.featuredCard}>
    <Box component="img" src={toAssetPath(topic.coverImage)} alt={topic.title} sx={styles.featuredImage} />
    <Box className="featured-overlay" sx={styles.featuredOverlay} />
    <Box sx={styles.featuredContent}>
      <Chip label="Featured" size="small" sx={styles.featuredChip} />
      <Typography className="featured-title" variant="h5" fontWeight={700} sx={styles.featuredTitle}>
        {topic.title}
      </Typography>
      <Typography variant="caption" sx={styles.featuredDate}>
        {moment(topic.updatedAt).format('DD MMM YYYY')}
      </Typography>
    </Box>
  </Box>
);

const SmallCard = ({ topic }) => (
  <Box component={Link} to={toLink(`topics/${topic.slug}`)} sx={styles.smallCardLink}>
    <Box component="img" src={toAssetPath(topic.coverImage)} alt={topic.title} sx={styles.smallCardImage} />
    <Box sx={{ overflow: 'hidden' }}>
      <Typography className="small-title" variant="body2" fontWeight={600} sx={styles.smallCardTitle}>
        {topic.title}
      </Typography>
      <Typography variant="caption" sx={styles.smallCardDate}>
        {moment(topic.updatedAt).format('DD MMM YYYY')}
      </Typography>
    </Box>
  </Box>
);

const LoadingSkeleton = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} md={7}>
      <Skeleton variant="rounded" height={460} sx={{ borderRadius: 3 }} />
    </Grid>
    <Grid item xs={12} md={5}>
      <Grid container spacing={2}>
        {[...Array(4)].map((_, i) => (
          <Grid key={i} item xs={12} sm={6}>
            <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
);

export const HomeLatestBlog = ({ truncate = 148 }) => {
  const { t } = useTranslation();
  const { data, isFetching } = actions.useGetRecentTopicsQuery({ truncate });
  const { data: topics } = data || initials.dataArr();

  const [featured, ...rest] = topics || [];
  const sideTopics = rest.slice(0, 4);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.sectionHeader}>
        <Box>
          <Typography variant="overline" sx={styles.sectionLabel}>
            {t('teachings').toUpperCase()}
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={styles.sectionTitle}>
            {t('latest')}
          </Typography>
        </Box>
        <Button
          component={Link}
          to={toLink('topics')}
          endIcon={<ArrowOutward fontSize="small" />}
          sx={styles.viewMoreBtnDesktop}
        >
          {t('actions.viewMore')}
        </Button>
      </Box>

      {isFetching ? (
        <LoadingSkeleton />
      ) : topics?.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            {featured && <FeaturedCard topic={featured} />}
            <Button
              component={Link}
              to={toLink('topics')}
              endIcon={<ArrowOutward fontSize="small" />}
              sx={styles.viewMoreBtnMobile}
            >
              {t('actions.viewMore')}
            </Button>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              {sideTopics.map((topic) => (
                <Grid key={topic.slug} item xs={12} sm={6}>
                  <Box sx={styles.sideCard}>
                    <Box component="img" src={toAssetPath(topic.coverImage)} alt={topic.title} sx={styles.sideCardImage} />
                    <Box sx={styles.sideCardContent}>
                      <SmallCard topic={topic} />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};

export default HomeLatestBlog;
