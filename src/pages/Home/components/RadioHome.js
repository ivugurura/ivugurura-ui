import React from 'react';

import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';

import { Radio } from '../../../common/components/Radio';

export const RadioHome = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
            RRV
          </Avatar>
        }
        title="Radiolize"
        subheader={t('logoTitle')}
      />
      <Radio />
      <CardContent>
        <Typography variant="h5" color="text.secondary">
          {t('radioMsg')}
        </Typography>
        <Button>{t('listenRadio')}</Button>
      </CardContent>
    </Card>
  );
};
