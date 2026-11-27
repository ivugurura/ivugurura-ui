import React from 'react';

import {
  Campaign as CampaignIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  Link as MuiLink,
  Typography,
} from '@mui/material';
import { actions, initials, type QueryHook } from '@redux/actions';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { toLink } from '../../helpers/utils/constants';

export const AnnouncementBar: React.FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = React.useState(true);
  const useGetPubConfig = actions.useGetPubConfigQuery as QueryHook<
    APP.IPub,
    { truncate: number }
  >;
  const { data, isFetching } = useGetPubConfig({
    truncate: 70,
  });

  const { data: communique } = data || initials.dataObj<APP.IPub>();

  if (isFetching || !communique?.title || !show) return null;

  return (
    <Box
      role="status"
      sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
    >
      <Container
        maxWidth="lg"
        sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1 }}
      >
        <CampaignIcon fontSize="small" sx={{ flexShrink: 0 }} />
        <Typography
          variant="body1"
          sx={{ flex: 1, minWidth: 0, color: 'inherit' }}
        >
          <Box component="strong" sx={{ fontWeight: 600 }}>
            {communique.title}
          </Box>
          {communique.content && `: ${communique.content} `}
          <MuiLink
            component={Link}
            to={toLink('announcement')}
            color="inherit"
            underline="always"
            sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}
          >
            {t('actions.more')}
          </MuiLink>
        </Typography>
        <IconButton
          size="small"
          aria-label={t('actions.close', 'Close')}
          sx={{ color: 'inherit', flexShrink: 0 }}
          onClick={() => setShow(false)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Container>
    </Box>
  );
};
