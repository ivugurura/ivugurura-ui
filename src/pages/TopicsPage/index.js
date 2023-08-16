import React from 'react';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import {
  Avatar, Grid, CardHeader, IconButton, Card,
} from '@mui/material';
import { red } from '@mui/material/colors';

import { RRVPagination } from '../../common/components/RRVPagination';
import { usePagination } from '../../common/hooks/usePagination';
import { actions, initials } from '../../redux/apiSliceBuilder';
import { TopicsHeader } from '../components';
import TopicItem from '../TopicItem';

export const TopicsPage = () => {
  const {
    pagination: { page, pageSize },
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(1, 15);
  const { data, isFetching } = actions.useListTopicsQuery({ truncate: 148, page, pageSize });
  const { data: topics, totalItems } = data || initials.dataArr;
  console.log('TopicsPage', { isFetching, page, pageSize });
  return (
    <Grid container spacing={2}>
      <Grid item md={9}>
        <Grid container>
          <Grid item md={12}>
            <TopicsHeader />
          </Grid>
          <Grid item md={12}>
            <Grid container>
              <Masonry columns={3}>
                {topics?.length > 0 && topics.map((topic) => (
                  <TopicItem key={topic.slug} topic={topic} hasMore />
                ))}
              </Masonry>
              <RRVPagination
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                dataCount={totalItems}
                page={page}
                pageSize={pageSize}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Grid container spacing={1}>
          {[1, 2, 3, 4].map((el) => (
            <Grid item key={el}>
              <Card>
                <CardHeader
                  avatar={(
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  )}
                  action={(
                    <IconButton aria-label="settings">
                      <MoreVertIcon />
                    </IconButton>
                  )}
                  title="Shrimp and Chorizo Paella and tcella"
                  subheader="September 14, 2016"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
