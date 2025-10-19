import React from 'react';

import { Box } from '@mui/material';

export const HomeOverview = () => {
  <Box
    sx={{
      display: 'flex',
      flexDirection: { xs: 'column', sm: 'row' },
    }}
  >
    <Box>Youtube</Box>
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
      }}
    >
      <Box>Radio</Box>
      <Box>Topics</Box>
    </Box>
  </Box>;
};
