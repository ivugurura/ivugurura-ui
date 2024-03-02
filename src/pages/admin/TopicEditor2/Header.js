import React from 'react';

import { Typography } from '@mui/material';

export const Header = () => (
  <div>
    <Typography component="h2" gutterBottom variant="overline">
      New topic
    </Typography>
    <Typography component="h1" variant="h3">
      Add a new topics
    </Typography>
  </div>
);
