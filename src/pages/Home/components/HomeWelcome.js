import React from 'react';

import { PlayArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const HomeWelcomePage = () => {
  const { t } = useTranslation();
  return (
    <Box className="welcome">
      <Box px={8} width="60%">
        <Typography variant="subtitle2" pt={8} fontSize={16} fontWeight={700}>
          {t('welcome')}
        </Typography>
        <Typography
          variant="subtitle2"
          py={2}
          fontSize={36}
          fontWeight={700}
          lineHeight={1.2}
        >
          {t('mathew2414')}
        </Typography>
        <Box display="flex">
          <Button variant="contained" startIcon={<PlayArrow />}>
            {t('listenRadio')}
          </Button>
          <Button variant="outlined" startIcon={<PlayArrow />} sx={{ mx: 2 }}>
            {t('watch')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
