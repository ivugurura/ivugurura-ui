import * as React from 'react';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Avatar, Button, Card, CardContent, CardHeader, CardMedia, IconButton,
} from '@mui/material';
import { red } from '@mui/material/colors';
import classNames from 'classnames';
import parse from 'html-react-parser';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {
  toAssetPath, toLink, truncate,
} from '../helpers/utils/constants';

import { Comments } from './TopicDetails/Comments';

const TopicItem = ({
  className = '', topic, imageHeight = '194', hasMore = false,
  showComments = false,
}) => {
  console.log('Topic');

  return (
    <Card className={classNames(className)}>
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
        title={truncate(topic.title, 34)}
        subheader={`Lastly updated ${moment(topic.updatedAt).format('DD.MM.YYYY')}`}
      />
      <CardMedia
        component="img"
        height={imageHeight}
        image={toAssetPath(topic.coverImage)}
        alt={topic.title}
      />
      <CardContent>
        {parse(topic.content || 'No content available')}
        {hasMore && <Button size="small" component={Link} to={toLink(`topics/${topic.slug}`)}>More</Button>}
        {showComments && <Comments slug={topic.slug} />}
      </CardContent>
    </Card>
  );
};

export default TopicItem;
