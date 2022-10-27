import React from 'react';

import { Info as InfoIcon } from '@mui/icons-material';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import RMCarousel from 'react-material-ui-carousel';

export const HomeCarousel = () => {
  console.log('HomeCarsoul');
  return (
    <RMCarousel indicators={false}>
      {[1, 2].map((index) => (
        <ImageListItem key={index}>
          <img
            src="https://reformationvoice.org/topic-cour-img.png?w=248&fit=crop&auto=format"
            srcSet="https://reformationvoice.org/topic-cour-img.png?w=248&fit=crop&auto=format&dpr=2 2x"
            alt="item.title"
            loading="lazy"
          />
          <ImageListItemBar
            title={`item.title ${index}`}
            subtitle={`item.author ${index}`}
            actionIcon={(
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label="info about item.title"
              >
                <InfoIcon />
              </IconButton>
            )}
          />
        </ImageListItem>
      ))}
    </RMCarousel>
  );
};
