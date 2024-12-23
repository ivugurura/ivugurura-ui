import React from 'react';

import { Box, Typography } from '@mui/material';
import parse from 'html-react-parser';

import { toAssetPath } from '../../helpers/utils/constants';

export const TopicDetailsItem = ({ topic }) => {
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: {
            xs: '300px',
            sm: '400px',
            md: '510px',
          },
        }}
      >
        <img
          src={toAssetPath(topic.coverImage)}
          alt={topic.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Box
          p={4}
          sx={{
            width: {
              xs: '100%',
              sm: '70%',
              md: '700px',
            },
          }}
        >
          <Typography component="div">
            {parse(topic.content || 'No content available')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
