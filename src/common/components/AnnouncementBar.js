import React from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { Typography, IconButton, Box } from '@mui/material';

export const AnnouncementBar = ({ message, onClose }) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 16px',
        position: 'fixed',
      }}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {message}
      </Typography>
      {onClose && (
        <IconButton
          size="small"
          sx={{ color: 'primary.contrastText' }}
          onClick={onClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};
