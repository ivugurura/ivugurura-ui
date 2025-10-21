import React from 'react';

import { Card, CardContent, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const DashboardCount = ({
  difference,
  sx = { height: '100%' },
  value,
  title,
}) => (
  <Card sx={sx}>
    <CardContent>
      <Stack
        alignItems="flex-start"
        direction="row"
        justifyContent="space-between"
        spacing={3}
      >
        <Stack spacing={1}>
          <Typography color="text.secondary" variant="overline">
            {title}
          </Typography>
          <Typography variant="h4">{value}</Typography>
        </Stack>
      </Stack>
      {difference && (
        <Stack alignItems="center" direction="row" spacing={2} sx={{ mt: 2 }}>
          <Stack alignItems="center" direction="row" spacing={0.5}>
            <Typography
              color={difference > 0 ? 'success.main' : 'error.main'}
              variant="body2"
            >
              {difference}% <p>better</p>
            </Typography>
          </Stack>
          <Typography color="text.secondary" variant="caption">
            <p>Since last month</p>
          </Typography>
        </Stack>
      )}
    </CardContent>
  </Card>
);

DashboardCount.prototypes = {
  difference: PropTypes.number,
  positive: PropTypes.bool,
  value: PropTypes.string.isRequired,
};
