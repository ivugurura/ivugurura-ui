import React from 'react';

import {
  Avatar,
  Button,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { Radio } from '../../../common/components/Radio';

export const RadioHome = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar className="bg-gradient" aria-label="Radiolize">
            RRV
          </Avatar>
        }
        title="Radiolize"
        subheader={t('logoTitle')}
      />
      <CardContent sx={{ maxHeight: 287, overflow: 'scroll' }}>
        <Radio />
        <Box>
          {t('radioMsg')}
          <Button>{t('listenRadio')}</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
