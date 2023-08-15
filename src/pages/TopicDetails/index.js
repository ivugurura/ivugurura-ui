import React, { useEffect } from 'react';

import {
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  RssFeed as RssFeedIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import {
  Avatar, Grid, CardHeader, IconButton, Card,
} from '@mui/material';
import { red } from '@mui/material/colors';
import { useParams } from 'react-router';

import { RRVBreadcrumbs } from '../../common/components/RRVBreadcrumbs';
import { actions, initials } from '../../redux/apiSliceBuilder';
import TopicItem from '../TopicItem';

const initialTopicHomeNavs = [{
  name: 'Topics',
  route: 'topics',
  primaryIcon: HomeIcon,
}];
export const TopicDetailPage = () => {
  const { slug } = useParams();
  const { data, isFetching } = actions.useViewTopicQuery({ slug });
  const [topicNavs, setTopicNavs] = React.useState(initialTopicHomeNavs);

  const { data: topic } = data || initials.dataObj;
  useEffect(() => {
    if (topic?.slug) {
      const newNavs = [{
        name: `${topic.category.name}(${topic.category.relatedTopics.length})`,
        route: `topics/${topic.category?.slug}`,
        primaryIcon: CategoryIcon,
        secondaryIcon: ExpandMoreIcon,
      }, {
        primaryIcon: RssFeedIcon,
        name: topic.title,
      }];
      setTopicNavs((prev) => prev.concat(newNavs));
    }
  }, [topic?.slug]);
  console.log('TopicDetailPage', { isFetching, topic });

  return (
    <Grid container spacing={2}>
      <Grid item md={9}>
        <Grid container>
          <Grid item md={12}>
            <RRVBreadcrumbs crumbs={topicNavs} />
          </Grid>
          <Grid item md={12}>
            <Card>
              {topic && <TopicItem topic={topic} imageHeight="380" />}
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={3}>
        {topic && (
        <Grid container spacing={1}>
          {topic?.category?.relatedTopics.map((rt) => (
            <Grid item key={rt.slug} sx={{ width: '100%' }}>
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
                  title={rt.title}
                  subheader="September 14, 2016"
                />
              </Card>
            </Grid>
          ))}
        </Grid>
        )}
      </Grid>
    </Grid>
  );
};
