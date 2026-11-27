import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonBase,
  Container,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import parse from 'html-react-parser';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { toAssetPath, toLink } from '../../../helpers/utils/constants';
import { actions, initials, type QueryHook } from '../../../redux/actions';
import { PageRoutes } from '../../../RoutesConstants';
import TopicItem from '../../TopicItem';

interface HomeRecentTopicsProps {
  truncate?: number;
  /** Topics shown in the list beside the featured one. */
  listSize?: number;
}

const clamp = (lines: number) =>
  ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }) as const;

const dateSx = {
  color: 'primary.main',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
} as const;

/** Compact horizontal row: thumbnail, date, title and a short excerpt. */
const TopicRow = ({ topic }: { topic: APP.ITopic }) => (
  <ButtonBase
    component={Link}
    to={toLink(`topics/${topic.slug}`)}
    sx={{
      width: 1,
      p: 1.5,
      gap: 2,
      borderRadius: 2,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      textAlign: 'left',
      transition: 'background-color 0.2s ease',
      '& img': { transition: 'transform 0.4s ease' },
      '&:hover': { bgcolor: 'action.hover' },
      '&:hover img': { transform: 'scale(1.05)' },
      '&:hover .title': { color: 'primary.main' },
    }}
  >
    <Box
      sx={{
        flexShrink: 0,
        width: { xs: 96, sm: 148 },
        aspectRatio: '4 / 3',
        borderRadius: 1.5,
        overflow: 'hidden',
        bgcolor: 'grey.100',
      }}
    >
      <Box
        component="img"
        src={toAssetPath(topic.coverImage)}
        alt=""
        loading="lazy"
        sx={{ width: 1, height: 1, objectFit: 'cover', display: 'block' }}
      />
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography variant="body2" component="p" sx={{ ...dateSx, mb: 0.5 }}>
        {moment(topic.updatedAt).format('DD MMM YYYY')}
      </Typography>
      <Typography
        className="title"
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 600,
          lineHeight: 1.35,
          transition: 'color 0.2s ease',
          ...clamp(2),
        }}
      >
        {topic.title}
      </Typography>
      <Box
        sx={{
          mt: 0.5,
          color: 'text.secondary',
          typography: 'body1',
          lineHeight: 1.6,
          display: { xs: 'none', sm: '-webkit-box' },
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          '& p': { m: 0, display: 'inline' },
        }}
      >
        {parse(topic.content || '')}
      </Box>
    </Box>
  </ButtonBase>
);

const RowSkeleton = () => (
  <Stack direction="row" spacing={2} sx={{ p: 1.5 }}>
    <Skeleton
      variant="rounded"
      sx={{
        flexShrink: 0,
        width: { xs: 96, sm: 148 },
        height: { xs: 72, sm: 111 },
      }}
    />
    <Box sx={{ flex: 1 }}>
      <Skeleton width="30%" />
      <Skeleton width="90%" height={28} />
      <Skeleton width="70%" />
    </Box>
  </Stack>
);

export const HomeRecentTopics = ({
  truncate = 160,
  listSize = 3,
}: HomeRecentTopicsProps) => {
  const { t } = useTranslation();
  const useGetCsTopics = actions.useGetCsTopicsQuery as QueryHook<
    APP.ITopic[],
    { truncate: number }
  >;
  const { data, isFetching } = useGetCsTopics({ truncate });
  const { data: topics } = data || initials.dataArr<APP.ITopic>();

  const [featured, ...others] = topics ?? [];
  const list = others.slice(0, listSize);

  if (!isFetching && !featured) return null;

  const allTopicsButton = (sx: object) => (
    <Button
      component={Link}
      to={toLink(PageRoutes.Topics)}
      variant="outlined"
      endIcon={<ArrowForward />}
      sx={sx}
    >
      {t('allTopics')}
    </Button>
  );

  return (
    <Box component="section" sx={{ bgcolor: 'background.paper' }}>
      <Container maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Stack
          direction="row"
          sx={{
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 2,
            mb: { xs: 3, md: 4 },
          }}
        >
          <Box>
            <Typography
              variant="body2"
              component="p"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                mb: 1,
              }}
            >
              {t('readOurBlog')}
            </Typography>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 600,
              }}
            >
              {t('recentTopics')}
            </Typography>
          </Box>
          {allTopicsButton({
            flexShrink: 0,
            display: { xs: 'none', sm: 'inline-flex' },
          })}
        </Stack>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          <Grid size={{ xs: 12, md: list.length > 0 || isFetching ? 6 : 12 }}>
            {isFetching ? (
              <Skeleton
                variant="rounded"
                height={480}
                sx={{ borderRadius: 3 }}
              />
            ) : (
              <TopicItem topic={featured} imageHeight={280} hasMore />
            )}
          </Grid>
          {(isFetching || list.length > 0) && (
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack
                divider={<Divider flexItem sx={{ mx: 1.5 }} />}
                sx={{
                  mx: -1.5,
                  my: -1.5,
                  height: { md: 'calc(100% + 24px)' },
                  justifyContent: { md: 'space-between' },
                }}
              >
                {isFetching
                  ? Array.from({ length: listSize }, (_, i) => (
                      <RowSkeleton key={i} />
                    ))
                  : list.map((topic) => (
                      <TopicRow key={topic.slug} topic={topic} />
                    ))}
              </Stack>
            </Grid>
          )}
        </Grid>

        {allTopicsButton({ mt: 3, display: { sm: 'none' }, width: 1 })}
      </Container>
    </Box>
  );
};
