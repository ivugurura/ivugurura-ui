import React from 'react';

import { Info as InfoIcon } from '@mui/icons-material';
import {
  CardMedia, IconButton, ImageListItem, ImageListItemBar,
} from '@mui/material';
import RMCarousel from 'react-material-ui-carousel';

import { toAssetPath } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { CarsoulLoader } from './HomeLoaders';

export const HomeCarousel = () => {
  const { data, isFetching } = actions.useGetCsTopicsQuery({ truncate: 56 });
  const { data: topics } = data || initials.dataArr;
  const imgProps = { component: 'img', height: '250' };
  return (
    <>
      {isFetching ? <CarsoulLoader /> : topics?.length > 0 && (
      <RMCarousel indicators={false}>
        {topics.map((topic) => (
          <ImageListItem key={topic.title}>
            <CardMedia image={toAssetPath(topic.coverImage)} alt={topic.title} {...imgProps} />
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
        <CardMedia image="https://reformationvoice.org/topic-cour-img.png" alt="Revival and reformation" {...imgProps} />
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
