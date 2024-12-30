import React from 'react';

import { PlayArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { palette } from '../../../common/theme/palette';

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
          py={4}
          fontSize={36}
          fontWeight={700}
          lineHeight={1.2}
        >
          {t('mission')}
        </Typography>
        <Box display="flex">
          <Button
            variant="contained"
            startIcon={<PlayArrow />}
            sx={{
              background: palette.darkBlue,
              fontWeight: 400,
              p: 1.8,
              borderRadius: '12px',
              boxShadow: 'none',
            }}
          >
            {t('listenRadio')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            sx={{
              color: palette.darkBlue,
              fontWeight: 600,
              p: 1.8,
              borderRadius: '12px',
              boxShadow: 'none',
              border: `2px solid ${palette.darkBlue}`,
              mx: 2,
            }}
          >
            {t('watch')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
