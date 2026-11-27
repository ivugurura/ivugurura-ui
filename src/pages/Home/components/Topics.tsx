import { Box, Button, Grid, Typography, type GridSize } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { TopicsCardSkeleton } from '../../../common/components/loaders';
import { toLink } from '../../../helpers/utils/constants';
import { actions, initials, type QueryHook } from '../../../redux/actions';
import TopicItem from '../../TopicItem';

interface HomeRecentTopicsProps {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  truncate?: number;
}

export const HomeRecentTopics = ({
  xs = 12,
  sm = 12,
  md = 4.01,
  truncate = 148,
}: HomeRecentTopicsProps) => {
  const { t } = useTranslation();
  const useGetCsTopics = actions.useGetCsTopicsQuery as QueryHook<
    APP.ITopic[],
    { truncate: number }
  >;
  const { data, isFetching } = useGetCsTopics({ truncate });

  const { data: topics } = data || initials.dataArr<APP.ITopic>();

  return (
    <Box p={2}>
      <Box display="flex" flexDirection="column" alignItems="center" pb={4}>
        <Typography variant="subtitle2" py={2}>
          {t('readOurBlog').toUpperCase()}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: {
              xs: '20px',
              sm: '28px',
              md: '36px',
            },
          }}
          fontWeight={800}
        >
          {t('teachings')}
        </Typography>
      </Box>
      <Grid container spacing={4} display="flex" justifyContent="center">
        {isFetching ? (
          <TopicsCardSkeleton totalItems={4} itemsSize={{ xs, sm, md }} />
        ) : (
          topics?.length > 0 &&
          topics.map((topic) => (
            <Grid key={topic.title} size={{ xs, sm, md }}>
              <TopicItem topic={topic} hasMore />
            </Grid>
          ))
        )}
      </Grid>
      <Grid container display="flex" justifyContent="center">
        <Box paddingTop={2} alignItems="flex-end">
          <Button variant="text" component={Link} to={toLink('topics')}>
            {t('actions.viewMore')}
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};
