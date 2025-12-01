import React from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { toLink } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';

interface PubConfigResponse {
  data?: {
    title: string;
    content: string;
  };
}

export const AnnouncementBar: React.FC<PubConfigResponse> = () => {
  const { t } = useTranslation();
  const [show, setShow] = React.useState(true);
  const { data, isFetching } = actions.useGetPubConfigQuery({
    truncate: 70,
  }) as {
    data?: PubConfigResponse;
  };

  const { data: communique } = data || initials.dataObj();

  if (isFetching || !communique || !show) return null;

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
        zIndex: 15,
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: 500,
          color: ({ palette }) => palette.white,
          animation: 'twinkle 1.5s infinite alternate',
          '@keyframes twinkle': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0.3 },
            '100%': { opacity: 1 },
          },
        }}
      >
        {`🚀 ${communique.title}: $${communique.content}, `}
        <span>
          <Link to={toLink('announcement')}>{t('actions.more')}</Link>
        </span>
      </Typography>
      <IconButton
        size="small"
        sx={{ color: 'primary.contrastText' }}
        onClick={() => setShow(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};
