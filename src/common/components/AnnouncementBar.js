import React from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { Typography, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';

import { toLink } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';

export const AnnouncementBar = () => {
  const [show, setShow] = React.useState(true);
  const { data, isFetching } = actions.useGetPubConfigQuery({ truncate: 70 });

  const { data: communique } = data || initials.dataObj;

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
          <Link to={toLink('announcement')}>Learn more</Link>
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
