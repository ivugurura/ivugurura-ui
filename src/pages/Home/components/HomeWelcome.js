import React from 'react';

import { PlayArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const HomeWelcomePage = () => {
  const { t } = useTranslation();
  return (
    <Box className="welcome">
      <Box px={8} width={{ xs: '100%', sm: '80%', md: '60%' }}>
        <Typography
          variant="subtitle2"
          pt={8}
          sx={{
            fontSize: {
              xs: '12px',
              sm: '14px',
              md: '16px',
            },
          }}
          fontWeight={700}
        >
          {t('welcome').toUpperCase()}
        </Typography>
        <Typography
          variant="subtitle2"
          py={2}
          sx={{
            fontSize: {
              xs: '14px',
              sm: '28px',
              md: '36px',
            },
          }}
          fontWeight={700}
          lineHeight={1.2}
        >
          {t('mathew2414')}
        </Typography>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          gap={2}
          alignItems="center"
        >
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{
              fontSize: {
                xs: '10px',
                sm: '12px',
                md: '14px',
              },
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1, sm: 1.5, md: 2 },
              minWidth: { xs: '120px', sm: '140px', md: '160px' },
            }}
          >
            {t('listenRadio')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            sx={{
              fontSize: {
                xs: '10px',
                sm: '12px',
                md: '14px',
              },
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1, sm: 1.5, md: 2 },
              minWidth: { xs: '120px', sm: '140px', md: '160px' },
            }}
          >
            {t('watch')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
