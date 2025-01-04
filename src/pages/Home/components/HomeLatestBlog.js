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
  const { data, isFetching } = actions.useGetRecentTopicsQuery({
    truncate,
  });

  const { data: topics } = data || initials.dataArr;

  return (
    <Box py={4} px={8}>
      <Typography
        variant="subtitle2"
        sx={{
          fontSize: {
            xs: '20px',
            sm: '28px',
            md: '36px',
          },
        }}
        fontWeight={600}
      >
        {t('latest')}
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontSize: {
            xs: '12px',
            sm: '14px',
            md: '15px',
            lg: '16px',
          },
          fontWeight: 400,
          lineHeight: 1.2,
          py: {
            xs: 2,
            sm: 3,
            md: 4,
          },
        }}
      >
        {t('teachings')}
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
