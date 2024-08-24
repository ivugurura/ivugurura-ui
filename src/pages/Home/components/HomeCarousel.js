import React from 'react';

import { Info as InfoIcon } from '@mui/icons-material';
import {
  CardMedia,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material';

import { RRVCarousel } from '../../../common/components/RRVCarousel';
import { toAssetPath } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { CarsoulLoader } from './HomeLoaders';

const DEFAULT = {
  image: 'https://reformationvoice.org/topic-cour-img.png',
  title: 'Revival and reformation',
  subtitle: '',
};
const CarsouselItem = ({ topic = null }) => (
  <ImageListItem>
    <CardMedia
      component="img"
      height="250"
      image={topic ? toAssetPath(topic?.coverImage) : DEFAULT.image}
      alt={topic?.title || DEFAULT.title}
    />
    <ImageListItemBar
      title={topic?.title || DEFAULT.title}
      subtitle={topic?.content || DEFAULT.subtitle}
      actionIcon={
        <IconButton
          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
          aria-label={topic?.title || DEFAULT.title}
        >
          <InfoIcon />
        </IconButton>
      }
    />
  </ImageListItem>
);
export const HomeCarousel = () => {
  const { data, isFetching } = actions.useGetCsTopicsQuery({ truncate: 56 });
  const { data: topics } = data || initials.dataArr;

  if (isFetching) return <CarsoulLoader />;

  return topics?.length > 0 ? (
    <RRVCarousel indicators={false}>
      {topics.map((topic) => (
        <CarsouselItem key={topic.title} topic={topic} />
      ))}
    </RRVCarousel>
  ) : (
    <CarsouselItem />
  );
};
