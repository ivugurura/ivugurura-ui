import React from 'react';

import { Box, Typography } from '@mui/material';

interface PageHeaderProps {
  title?: string;
  description?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={2}
      px={2}
    >
      {title && (
        <Typography variant="subtitle2" py={2}>
          {title}
        </Typography>
      )}
      <Typography variant="h3" fontWeight={800}>
        {description}
      </Typography>
    </Box>
  );
};
