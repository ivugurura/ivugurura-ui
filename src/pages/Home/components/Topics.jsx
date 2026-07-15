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
import { styles } from './Topics.style';

export const HomeRecentTopics = ({ truncate = 148 }) => {
  const { t } = useTranslation();
  const { data, isFetching } = actions.useGetCsTopicsQuery({ truncate });
  const { data: topics } = data || initials.dataArr();

  const [featured, ...rest] = topics || [];
  const sideTopics = rest.slice(0, 6);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.sectionHeader}>
        <Box>
          <Typography variant="overline" sx={styles.sectionLabel}>
            {t('readOurBlog').toUpperCase()}
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={styles.sectionTitle}>
            {t('teachings')}
          </Typography>
        </Box>
        <Button
          component={Link}
          to={toLink('topics')}
          endIcon={<ArrowOutward fontSize="small" />}
          sx={styles.viewMoreBtn}
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
          </Grid>
          <Grid item xs={12} md={5}>
            <SideTopicsGrid topics={sideTopics} />
          </Grid>
        </Grid>
      ) : null}
    </Box>
  );
};
