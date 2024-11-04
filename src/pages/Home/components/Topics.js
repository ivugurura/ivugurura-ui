import React from 'react';

import { Grid, Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { TopicsCardSkeleton } from '../../../common/components/loaders';
import { toLink } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import TopicItem from '../../TopicItem';

export const HomeRecentTopics = ({
  xs = 12,
  sm = 12,
  md = 3,
  truncate = 148,
}) => {
  const { t } = useTranslation();
  const { data, isFetching } = actions.useGetRecentTopicsQuery({
    truncate,
  });

  const { data: topics } = data || initials.dataArr;
  return (
    <Grid container spacing={1}>
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
        justifyContent="center"
        alignItems="center"
      >
        <Box textAlign="center" paddingTop={2}>
          <Button component={Link} to={toLink('topics')}>
            {t('actions.viewMore')}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
