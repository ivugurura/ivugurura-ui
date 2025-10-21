import React from 'react';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography component="h2" gutterBottom variant="overline">
        {t('admin.topic.subtitle')}
      </Typography>
      <Typography component="h1" variant="h3">
        {t('admin.topic.title')}
      </Typography>
    </Box>
  );
};
