import { ArrowForward } from '@mui/icons-material';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import parse from 'html-react-parser';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RRVShare } from '../../common/components/RRVShare';
import { MAIN_URL, toAssetPath, toLink } from '../../helpers/utils/constants';
import { Comments } from '../TopicDetails/Comments';

interface TopicItemProps {
  topic: APP.ITopic;
  className?: string;
  imageHeight?: number | string;
  /** Card mode: clamps the excerpt and links to the topic page. */
  hasMore?: boolean;
  showComments?: boolean;
}

const clamp = (lines: number) =>
  ({
    display: '-webkit-box',
    WebkitLineClamp: lines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  }) as const;

export const TopicItem = ({
  className,
  topic,
  imageHeight = 200,
  hasMore = false,
  showComments = false,
}: TopicItemProps) => {
  const { t } = useTranslation();
  const topicLink = toLink(`topics/${topic.slug}`);

  const media = (
    <Box sx={{ overflow: 'hidden', bgcolor: 'grey.100' }}>
      <CardMedia
        component="img"
        image={toAssetPath(topic.coverImage)}
        alt={topic.title}
        loading="lazy"
        sx={{
          height: imageHeight,
          objectFit: 'cover',
          transition: 'transform 0.4s ease',
        }}
      />
    </Box>
  );

  const header = (
    <>
      <Typography
        variant="body2"
        component="p"
        sx={{
          color: 'primary.main',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          mb: 0.75,
        }}
      >
        {moment(topic.updatedAt).format('DD MMM YYYY')}
      </Typography>
      <Typography
        variant="h6"
        component="h3"
        sx={{ fontWeight: 600, lineHeight: 1.35, ...(hasMore && clamp(2)) }}
      >
        {topic.title}
      </Typography>
    </>
  );

  const body = (
    <Box
      sx={{
        mt: 1,
        color: 'text.secondary',
        typography: 'body1',
        lineHeight: 1.6,
        '& p': { m: 0 },
        ...(hasMore && clamp(3)),
      }}
    >
      {parse(topic.content || 'No content available')}
    </Box>
  );

  if (!hasMore) {
    return (
      <Card className={className}>
        {media}
        <CardContent>
          {header}
          {body}
          {showComments && <Comments slug={topic.slug} />}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={className}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)',
          '& img': { transform: 'scale(1.04)' },
        },
      }}
    >
      <CardActionArea
        component={Link}
        to={topicLink}
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          justifyContent: 'flex-start',
        }}
      >
        {media}
        <CardContent sx={{ flex: 1, p: 2.5 }}>
          {header}
          {body}
        </CardContent>
      </CardActionArea>
      <Divider />
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1,
        }}
      >
        <MuiLink
          component={Link}
          to={topicLink}
          underline="hover"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.5,
            fontWeight: 600,
            typography: 'body1',
          }}
        >
          {t('actions.more')}
          <ArrowForward sx={{ fontSize: 16 }} />
        </MuiLink>
        <RRVShare
          title={topic.title}
          href={MAIN_URL + topicLink}
          displayText={false}
          color={({ palette }) => palette.text.secondary}
        />
      </Stack>
    </Card>
  );
};
