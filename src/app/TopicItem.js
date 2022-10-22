import * as React from 'react';

import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import {
  Avatar, Card, CardContent, CardHeader, CardMedia, IconButton, Typography,
} from '@mui/material';
import { red } from '@mui/material/colors';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const TopicItem = ({ className }) => {
  console.log('Topic');

  return (
    <Card sx={{ maxWidth: 345 }} className={classNames(className)}>
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
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
    </Card>
  );
};

TopicItem.propTypes = {
  className: PropTypes.string.isRequired,
};

export default TopicItem;
