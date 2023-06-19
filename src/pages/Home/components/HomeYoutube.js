import React from 'react';

import YouTube from 'react-youtube';

import { useWindowSize } from '../../../common/hooks/useWindowSize';
import { actions } from '../../../redux/actions';

import { YoutubeLoader } from './HomeLoaders';

export const HomeYoutube = () => {
  const { width: winWidth, height: winHeight } = useWindowSize();
  const { data: ytData, isFetching } = actions.useListYoutubesQuery();
  const getOptions = () => {
    let height = 0.47 * winHeight;
    let width = 0.5 * winWidth;
    if (winWidth < 900) {
      width = winWidth;
    }
    if (winHeight < 789) {
      height = 370;
    }
    return {
      height,
      width,
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
  };
  const videoId = ytData?.items?.length > 0 ? ytData?.items?.[0]?.id.videoId : '-PweyZWNcLk';

  return isFetching ? <YoutubeLoader />
    : <YouTube videoId={videoId} opts={getOptions()} />;
};
