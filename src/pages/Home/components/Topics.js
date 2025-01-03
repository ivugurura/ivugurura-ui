import React from 'react';

import { Grid, Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { TopicsCardSkeleton } from '../../../common/components/loaders';
import { toLink } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import TopicItem from '../../TopicItem';

export const HomeRecentTopics = ({
  xs = 12,
  sm = 12,
  md = 4.01,
  truncate = 148,
}) => {
  const { t } = useTranslation();
  const { data, isFetching } = actions.useGetRecentTopicsQuery({
    truncate,
  });

  const { data: topics } = data || initials.dataArr;

  return (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" py={4}>
        <Typography variant="subtitle2" py={4}>
          {t('readOurBlog')}
        </Typography>
        <Typography variant="h1" fontWeight={800}>
          {t('teachings').toUpperCase()}
        </Typography>
      </Box>
      <Grid container spacing={4} display="flex" justifyContent="center">
        {isFetching ? (
          <TopicsCardSkeleton totalItems={4} itemsSize={{ xs, sm, md }} />
        ) : (
          topics?.length > 0 &&
          topics.map((topic) => (
            <Grid key={topic.title} item xs={xs} sm={sm} md={md}>
              <TopicItem topic={topic} hasMore />
            </Grid>
          ))
        )}
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Box paddingTop={2}>
            <Button variant="text" component={Link} to={toLink('topics')}>
              {t('actions.viewMore')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
