import { Box, Grid, Typography, type GridSize } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TopicsCardSkeleton } from '../../../common/components/loaders';
import { actions, initials, type QueryHook } from '../../../redux/actions';
import TopicItem from '../../TopicItem';

interface HomeLatestBlogProps {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  truncate?: number;
}

export const HomeLatestBlog = ({
  xs = 12,
  sm = 12,
  md = 4,
  truncate = 148,
}: HomeLatestBlogProps) => {
  const { t } = useTranslation();
  const useGetRecentTopics = actions.useGetRecentTopicsQuery as QueryHook<
    APP.ITopic[],
    { truncate: number }
  >;
  const { data, isFetching } = useGetRecentTopics({ truncate });

  const { data: topics } = data || initials.dataArr<APP.ITopic>();

  return (
    <Box sx={{ px: { xs: 2, md: 8 }, py: 4 }}>
      <Typography variant="h1" fontWeight={600}>
        {t('latest')}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 400,
          py: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {t('teachings').toUpperCase()}
      </Typography>

      <Grid container spacing={2} display="flex" justifyContent="center">
        {isFetching ? (
          <TopicsCardSkeleton totalItems={3} itemsSize={{ xs, sm, md }} />
        ) : (
          topics?.length > 0 &&
          topics.slice(0, 3).map((topic) => (
            <Grid key={topic.title} size={{ xs, sm, md }}>
              <TopicItem topic={topic} hasMore />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default HomeLatestBlog;
