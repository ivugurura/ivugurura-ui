import React, { useEffect } from 'react';

import {
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  RssFeed as RssFeedIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';
import { Grid, Box, Typography, Divider } from '@mui/material';
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

import { Comments } from './Comments';
import { TopicDetailsItem } from './TopicDetails.page';
import { styles } from './TopicDetails.style';

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
      <Box>
        <Grid item md={12}>
          <RRVBreadcrumbs crumbs={topicNavs} />
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <Typography variant="subtitle2" py={2}>
              {t('blog')}
            </Typography>
            <Typography variant="h1" fontWeight={800}>
              {topic.title}
            </Typography>
            <Typography variant="subtitle2" pt={2} fontSize={12}>
              {`${t('updatedAt')} ${moment(topic.updatedAt).format('DD MMMM, YYYY')}`}
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} md={3}>
            <Grid container spacing={1}>
              {isFetching ? (
                <TopicListItemSkeleton totalItem={9} />
              ) : (
                <Box display="flex">
                  <Divider
                    orientation="vertical"
                    sx={styles.dividers}
                    flexItem
                  />
                  <Box>
                    {topic?.category?.relatedTopics.map((rt) => (
                      <Grid
                        item
                        key={rt.slug}
                        sx={{ width: '100%', flexGrow: 1 }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={styles.slug}
                          onClick={() => {
                            navigation(toLink(`topics/${rt.slug}`), {
                              replace: true,
                            });
                          }}
                          pb={2}
                        >
                          {rt.title}
                        </Typography>
                      </Grid>
                    ))}
                  </Box>
                </Box>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container>
              <Grid item md={12}>
                {isFetching ? (
                  <TopicDetailSkeleton />
                ) : (
                  topic && <TopicDetailsItem topic={topic} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} display="flex" justifyContent="center">
          <Grid item xs={10}>
            <Box>
              <Comments slug={topic.slug} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </PageHelmet>
  );
};

export default TopicDetailPage;
