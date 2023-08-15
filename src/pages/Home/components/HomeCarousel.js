import React from 'react';

import { Info as InfoIcon } from '@mui/icons-material';
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material';
import RMCarousel from 'react-material-ui-carousel';

import { IMAGE_PATH } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { CarsoulLoader } from './HomeLoaders';

export const HomeCarousel = () => {
  const { data, isFetching } = actions.useGetCsTopicsQuery({ truncate: 56 });
  const { data: topics } = data || initials.dataArr;
  return (
    <>
      {isFetching ? <CarsoulLoader /> : topics?.length > 0 && (
      <RMCarousel indicators={false}>
        {topics.map((topic) => (
          <ImageListItem key={topic.title}>
            <img
              src={`${IMAGE_PATH}/${topic.coverImage}?w=248&fit=crop&auto=format`}
              srcSet={`${IMAGE_PATH}/${topic.coverImage}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt="item.title"
              loading="lazy"
            />
            <ImageListItemBar
              title={topic.title}
              subtitle={topic.content}
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
      )}
      {!isFetching && topics?.length === 0 && (
      <ImageListItem>
        <img
          src="https://reformationvoice.org/topic-cour-img.png?w=248&fit=crop&auto=format"
          srcSet="https://reformationvoice.org/topic-cour-img.png?w=248&fit=crop&auto=format&dpr=2 2x"
          alt="item.title"
          loading="lazy"
        />
        <ImageListItemBar
          title=""
          subtitle=""
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
      )}
    </>
  );
};
