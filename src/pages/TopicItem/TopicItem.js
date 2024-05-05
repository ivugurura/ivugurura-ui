import * as React from 'react';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
} from '@mui/material';
import { red } from '@mui/material/colors';
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

  return (
    <Card className={classNames(className)}>
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
        title={topic.title}
        subheader={`${t('updatedAt')} ${moment(topic.updatedAt).format('DD.MM.YYYY')}`}
        className={styles.title}
      />
      <CardMedia
        component="img"
        height={imageHeight}
        image={toAssetPath(topic.coverImage)}
        alt={topic.title}
      />
      <CardContent>
        {parse(topic.content || 'No content available')}
        {hasMore && (
          <Button
            size="small"
            component={Link}
            to={toLink(`topics/${topic.slug}`)}
          >
            {t('actions.more')}
          </Button>
        )}
        {showComments && <Comments slug={topic.slug} />}
      </CardContent>
    </Card>
  );
};
