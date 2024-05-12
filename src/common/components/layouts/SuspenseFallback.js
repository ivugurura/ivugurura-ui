import React from 'react';

import { Stack, Box, CircularProgress } from '@mui/material';

export const SuspenseFallback = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'zoomInOut 1s infinite alternate',
      }}
    >
      <Stack
        sx={{
          color: 'grey.500',
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '20px',
          boxShadow: '-9px -15px 35px 0px rgba(219,219,219,1)',
        }}
        spacing={1}
      >
        <Box
          component="img"
          sx={{
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt="Ubugorozi."
          src="/img/rrv.png"
        />
        <Box
          sx={{
            width: '100 px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        </Box>
      </Stack>
    </div>
  );
};
