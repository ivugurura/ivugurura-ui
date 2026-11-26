import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  type GridSize,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { TopicsCardSkeleton } from '../../../common/components/loaders';
import { toLink } from '../../../helpers/utils/constants';
import { actions, initials, type QueryHook } from '../../../redux/actions';
import { PageRoutes } from '../../../RoutesConstants';
import TopicItem from '../../TopicItem';

interface HomeLatestBlogProps {
  xs?: GridSize;
  sm?: GridSize;
  md?: GridSize;
  truncate?: number;
}

export const HomeLatestBlog = ({
  xs = 12,
  sm = 6,
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
    <Box
      component="section"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 2,
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box>
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
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
              }}
            >
              {t('latest')}
            </Typography>
          </Box>
          <Button
            component={Link}
            to={toLink(PageRoutes.Topics)}
            variant="outlined"
            endIcon={<ArrowForward />}
            sx={{ flexShrink: 0, display: { xs: 'none', sm: 'inline-flex' } }}
          >
            {t('allTopics')}
          </Button>
        </Stack>

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
        <Button
          component={Link}
          to={toLink(PageRoutes.Topics)}
          variant="outlined"
          fullWidth
          endIcon={<ArrowForward />}
          sx={{ mt: 3, display: { sm: 'none' } }}
        >
          {t('allTopics')}
        </Button>
      </Container>
    </Box>
  );
};

export default HomeLatestBlog;
