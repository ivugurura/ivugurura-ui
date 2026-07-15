import { ArrowOutward } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { toLink } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import {
  FeaturedCard,
  LoadingSkeleton,
  SideTopicsGrid,
} from './FeaturedTopics';
import { styles } from './HomeLatestBlog.style';

export const HomeLatestBlog = ({ truncate = 148 }) => {
  const { t } = useTranslation();
  const { data, isFetching } = actions.useGetRecentTopicsQuery({ truncate });
  const { data: topics } = data || initials.dataArr();

  const [featured, ...rest] = topics || [];
  const sideTopics = rest.slice(0, 6);

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
            <SideTopicsGrid topics={sideTopics} />
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};
