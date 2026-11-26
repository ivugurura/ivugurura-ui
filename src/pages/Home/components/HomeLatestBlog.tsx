import { Box, Container, Grid, Typography, type GridSize } from '@mui/material';
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
    <Container component="section" maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography
          variant="body2"
          component="p"
          sx={{
            color: 'primary.main',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            mb: 1,
          }}
        >
          {t('teachings')}
        </Typography>
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 600 }}
        >
          {t('latest')}
        </Typography>
      </Box>

      <Grid container spacing={3}>
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
    </Container>
  );
};

export default HomeLatestBlog;
