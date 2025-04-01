import React from 'react';

import { Box, Typography } from '@mui/material';

export const PageHeader = ({ title, description }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" py={2}>
      {title && (
        <Typography variant="subtitle2" py={4}>
          {title}
        </Typography>
      )}
      <Typography variant="h3" fontWeight={800}>
        {description}
      </Typography>
    </Box>
  );
};
