import React from 'react';

import { Grid, Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { TopicsCardSkeleton } from '../../../common/components/loaders';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import TopicItem from '../../TopicItem';

export const HomeLatestBlog = ({
  xs = 12,
  sm = 12,
  md = 4,
  truncate = 148,
}) => {
  const { t } = useTranslation();
  const { data, isFetching } = actions.useGetCsTopicsQuery({
    truncate,
  });

  const { data: topics } = data || initials.dataArr;

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
            <Grid key={topic.title} item xs={xs} sm={sm} md={md}>
              <TopicItem topic={topic} hasMore />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default HomeLatestBlog;
