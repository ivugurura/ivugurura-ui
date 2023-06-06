import React from 'react';

import {
  Avatar, Button, Card, CardContent, CardHeader, Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';

import { Radio } from '../../../common/components/Radio';

export const RadioHome = () => (
  <Card>
    <CardHeader
      avatar={(
        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
          RRV
        </Avatar>
        )}
      title="Radiolize"
      subheader="Ijwi ry ubugorozi"
    />
    <Radio />
    <CardContent>
      <Typography variant="h5" color="text.secondary">
        The radio broadcast songs and different topics. Health, family,
        prophecy and other useful topics.
      </Typography>
      <Button>Listen radio</Button>
    </CardContent>
  </Card>
);
