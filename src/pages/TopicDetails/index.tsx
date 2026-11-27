import React, { useEffect } from 'react';

import {
  Category as CategoryIcon,
  ExpandMore as ExpandMoreIcon,
  Home as HomeIcon,
  RssFeed as RssFeedIcon,
} from '@mui/icons-material';
import { Box, Divider, Grid, Typography } from '@mui/material';
import type { TFunction } from 'i18next';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import {
  TopicDetailSkeleton,
  TopicListItemSkeleton,
} from '../../common/components/loaders';
import {
  RRVBreadcrumbs,
  type Crumb,
} from '../../common/components/RRVBreadcrumbs';
import { PageHelmet } from '../../common/components/wrappers';
import { toLink } from '../../helpers/utils/constants';
import { actions, initials, type QueryHook } from '../../redux/actions';

import { Comments } from './Comments';
import { TopicDetailsItem } from './TopicDetails.page';
import { styles } from './TopicDetails.style';

const initialTopicHomeNavs = (t: TFunction): Crumb[] => [
  {
    name: t('topics'),
    route: toLink('topics'),
    primaryIcon: HomeIcon,
  },
];
const TopicDetailPage = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const { slug = '' } = useParams();
  const useViewTopic = actions.useViewTopicQuery as QueryHook<
    APP.ITopic,
    { slug: string }
  >;
  const { data, isFetching } = useViewTopic({ slug });
  const [topicNavs, setTopicNavs] = React.useState<Crumb[]>(
    initialTopicHomeNavs(t),
  );

  const { data: topic } = data || initials.dataObj<APP.ITopic>();
  useEffect(() => {
    if (topic?.slug && topic.category) {
      const relatedCount = topic.category.relatedTopics.length;
      const newNavs: Crumb[] = [
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic?.slug]);

  return (
    <PageHelmet title={topic?.title}>
      <Box>
        <Grid size={{ md: 12 }}>
          <RRVBreadcrumbs crumbs={topicNavs} />
          <Box display="flex" flexDirection="column" alignItems="center" py={4}>
            <Typography variant="h1" fontWeight={800}>
              {topic.title}
            </Typography>
            <Typography variant="subtitle2" pt={2} fontSize={12}>
              {`${t('updatedAt')} ${moment(topic.updatedAt).format('DD MMMM, YYYY')}`}
            </Typography>
          </Box>
        </Grid>
        <Grid container spacing={2} p={2}>
          <Grid size={{ xs: 12, md: 3 }}>
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
                      <Grid key={rt.slug} sx={{ width: '100%', flexGrow: 1 }}>
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
          <Grid size={{ xs: 12, md: 9 }}>
            <Grid container>
              <Grid size={{ md: 12 }}>
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
          <Grid size={10}>
            {topic.slug && (
              <Box>
                <Comments slug={topic.slug} />
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </PageHelmet>
  );
};

export default TopicDetailPage;
