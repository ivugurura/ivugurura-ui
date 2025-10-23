import { ArrowOutward } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import parse from 'html-react-parser';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { RRVShare } from '../../common/components/RRVShare';
import { MAIN_URL, toAssetPath, toLink } from '../../helpers/utils/constants';
import { Comments } from '../TopicDetails/Comments';

import styles from './TopicItem.module.scss';

export const TopicItem = ({
  className = '',
  topic,
  imageHeight = '194',
  hasMore = false,
  showComments = false,
}) => {
  const { t } = useTranslation();

  const linkProps = hasMore
    ? { component: Link, to: toLink(`topics/${topic.slug}`) }
    : {};
  const handleShare = () => {
    console.log('shared');
  };
  return (
    <Card sx={{ boxShadow: 'none' }} className={classNames(className)}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height={imageHeight}
          image={toAssetPath(topic.coverImage)}
          alt={topic.title}
        />

        <Box className={styles.linearBack}>
          <Typography
            variant="h6"
            fontWeight={600}
            className={styles.topic}
            {...linkProps}
          >
            {topic.title}
          </Typography>
          <Typography
            variant="subtitle2"
            fontWeight={400}
            fontSize={12}
            className={styles.topic}
          >
            {`${moment(topic.updatedAt).format('DD MMM YYYY')}`}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        {parse(topic.content || 'No content available')}

        {showComments && <Comments slug={topic.slug} />}
      </CardContent>
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            size="small"
            {...linkProps}
            className={styles.moreBtn}
            endIcon={<ArrowOutward fontSize="small" />}
          >
            {t('actions.more')}
          </Button>
          <RRVShare
            title={topic.title}
            href={MAIN_URL + toLink(`topics/${topic.slug}`)}
            onShare={handleShare}
            color={({ palette }) => palette.black}
          />
        </Box>
      )}
    </Card>
  );
};
