import * as React from 'react';

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

import {
  toAssetPath,
  toLink,
  // truncate
} from '../../helpers/utils/constants';
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
        <Button
          size="small"
          {...linkProps}
          className={styles.moreBtn}
          endIcon={<ArrowOutward fontSize="small" />}
        >
          {t('actions.more')}
        </Button>
      )}
    </Card>
  );
};
