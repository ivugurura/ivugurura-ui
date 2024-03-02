import React, { useEffect } from 'react';

import {
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  RssFeed as RssFeedIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { Avatar, Grid, CardHeader, IconButton, Card } from '@mui/material';
import { red } from '@mui/material/colors';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router';

import {
  TopicDetailSkeleton,
  TopicListItemSkeleton,
} from '../../common/components/loaders';
import { RRVBreadcrumbs } from '../../common/components/RRVBreadcrumbs';
import { toLink } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';
import TopicItem from '../TopicItem';

const initialTopicHomeNavs = [
  {
    name: 'Topics',
    route: toLink('topics'),
    primaryIcon: HomeIcon,
  },
];
export const TopicDetailPage = () => {
  const navigation = useNavigate();
  const { slug } = useParams();
  const { data, isFetching } = actions.useViewTopicQuery({ slug });
  const [topicNavs, setTopicNavs] = React.useState(initialTopicHomeNavs);

  const { data: topic } = data || initials.dataObj;
  useEffect(() => {
    if (topic?.slug) {
      const relatedCount = topic.category.relatedTopics.length;
      const newNavs = [
        {
          name: `${topic.category.name}(${relatedCount === 10 ? '10+' : relatedCount})`,
          route: toLink(`topics/?t=${topic.category?.slug}`),
          primaryIcon: CategoryIcon,
          secondaryIcon: ExpandMoreIcon,
        },
        {
          primaryIcon: RssFeedIcon,
          name: topic.title,
        },
      ];
      setTopicNavs(initialTopicHomeNavs.concat(newNavs));
    }
  }, [topic?.slug]);

  return (
    <Grid container spacing={2}>
      <Grid item md={9}>
        <Grid container>
          <Grid item md={12}>
            <RRVBreadcrumbs crumbs={topicNavs} />
          </Grid>
          <Grid item md={12}>
            {isFetching ? (
              <TopicDetailSkeleton />
            ) : (
              topic && (
                <TopicItem topic={topic} imageHeight="380" showComments />
              )
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        <Grid container spacing={1}>
          {isFetching ? (
            <TopicListItemSkeleton totalItem={9} />
          ) : (
            topic?.category?.relatedTopics.map((rt) => (
              <Grid item key={rt.slug} sx={{ width: '100%' }}>
                <Card sx={{ cursor: 'pointer' }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    onClick={() => {
                      navigation(toLink(`topics/${rt.slug}`), {
                        replace: true,
                      });
                    }}
                    title={rt.title}
                    subheader={`Lastly updated ${moment(rt.updatedAt).format('DD.MM.YYYY')}`}
                  />
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
