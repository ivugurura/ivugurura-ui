import React from 'react';

import { PlayArrow } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const HomeWelcomePage = ({ onScrollTo }) => {
  const { t } = useTranslation();
  return (
    <Box className="welcome">
      <Box px={8} width={{ xs: '100%', sm: '80%', md: '60%' }}>
        <Typography
          variant="subtitle2"
          pt={8}
          fontWeight={700}
          sx={{ color: ({ palette }) => palette.white }}
        >
          {t('welcome')}
        </Typography>
        <Typography
          variant="h2"
          py={2}
          fontWeight={700}
          lineHeight={1.2}
          sx={{ color: ({ palette }) => palette.white }}
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
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1, sm: 1.5, md: 2 },
              minWidth: { xs: '120px', sm: '140px', md: '160px' },
            }}
            onClick={() => onScrollTo('radio')}
          >
            {t('listenRadio')}
          </Button>
          <Button
            variant="outlined"
            startIcon={<PlayArrow />}
            sx={{
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 1, sm: 1.5, md: 2 },
              minWidth: { xs: '120px', sm: '140px', md: '160px' },
              color: ({ palette }) => palette.white,
              borderColor: ({ palette }) => palette.white,
            }}
            onClick={() => onScrollTo('youtube')}
          >
            {t('watch')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
