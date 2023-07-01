import * as React from 'react';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Avatar, Button, Card, CardContent, CardHeader, CardMedia, IconButton, Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import classNames from 'classnames';
// import PropTypes from 'prop-types';
import moment from 'moment';

import { IMAGE_PATH, truncate } from '../helpers/utils/constants';

const TopicItem = ({ className = '', topic }) => {
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
        subheader={`Cyateguwe kuwa ${moment(topic.updatedAt).format('DD.MM.YYYY')}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={`${IMAGE_PATH}/${topic.coverImage}`}
        alt={topic.title}
      />
      <CardContent>
        <Typography variant="body1" color="text.secondary">
          {topic.content}
          <Button size="small">More</Button>
        </Typography>
      </CardContent>
    </Card>
  );
};

// TopicItem.propTypes = {
//   className: PropTypes.string.isRequired,
// };

export default TopicItem;
