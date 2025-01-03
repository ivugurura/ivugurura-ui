import React, { useEffect } from 'react';

import {
  MoreVert as MoreVertIcon,
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  RssFeed as RssFeedIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { Avatar, Grid, CardHeader, IconButton, Card } from '@mui/material';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import {
  TopicDetailSkeleton,
  TopicListItemSkeleton,
} from '../../common/components/loaders';
import { RRVBreadcrumbs } from '../../common/components/RRVBreadcrumbs';
import { PageHelmet } from '../../common/components/wrappers';
import { toLink } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';
import TopicItem from '../TopicItem';

const initialTopicHomeNavs = (t) => [
  {
    name: t('topics'),
    route: toLink('topics'),
    primaryIcon: HomeIcon,
  },
];
const TopicDetailPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { slug } = useParams();
  const { data, isFetching } = actions.useViewTopicQuery({ slug });
  const [topicNavs, setTopicNavs] = React.useState(initialTopicHomeNavs(t));

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
      setTopicNavs(initialTopicHomeNavs(t).concat(newNavs));
    }
  }, [topic?.slug]);

  return (
    <PageHelmet title={topic?.title}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
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
        <Grid item xs={12} md={3} className="bg-gradient">
          <Grid container spacing={1}>
            {isFetching ? (
              <TopicListItemSkeleton totalItem={9} />
            ) : (
              topic?.category?.relatedTopics.map((rt) => (
                <Grid item key={rt.slug} sx={{ width: '100%' }}>
                  <Card sx={{ cursor: 'pointer' }}>
                    <CardHeader
                      avatar={
                        <Avatar className="bg-gradient" aria-label={rt.title}>
                          {rt.title?.charAt(0)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label={rt.title}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      onClick={() => {
                        navigation(toLink(`topics/${rt.slug}`), {
                          replace: true,
                        });
                      }}
                      title={<strong>{rt.title}</strong>}
                      subheader={`${t('updatedAt')} ${moment(rt.updatedAt).format('DD.MM.YYYY')}`}
                    />
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </PageHelmet>
  );
};

export default TopicDetailPage;
