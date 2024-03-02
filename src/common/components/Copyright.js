import React from 'react';

import { Typography } from '@mui/material';

import { currentYear } from '../../helpers/utils/constants';

export const Copyright = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    &copy;
    {` Copyright 2016-${currentYear}, Ivugurura n Ubugorozi. All rights reserved.`}
  </Typography>
);
