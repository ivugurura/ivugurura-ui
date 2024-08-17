import React, { useEffect } from 'react';

import YouTube from 'react-youtube';

import { useWindowSize } from '../../../common/hooks/useWindowSize';
import { initials } from '../../../redux/apiSliceBuilder';

import { YoutubeLoader } from './HomeLoaders';

export const HomeYoutube = ({
  youtubeData = {},
  widthRatio = 0.485,
  heightRatio = 0.7,
  normalHeight = 360,
  randomize = false,
}) => {
  const [videoId, setVideoId] = React.useState('-PweyZWNcLk');
  const [playerSizes, setPlayerSizes] = React.useState({});
  const { width: winWidth, height: winHeight } = useWindowSize();
  const { data, isFetching } = youtubeData;
  const { data: ytData } = data || initials.dataObj;
  useEffect(() => {
    let width = winWidth * widthRatio;
    const height = normalHeight;
    if (winWidth < 900) {
      width = winWidth - 30;
    }
    setPlayerSizes({ height, width });
  }, [widthRatio, heightRatio, winHeight, winWidth, normalHeight]);

  useEffect(() => {
    const items = ytData?.items;
    if (items?.length > 0) {
      if (randomize) {
        const randomIndex = Math.floor(Math.random() * items.length);
        setVideoId(items[randomIndex].id.videoId);
      } else {
        setVideoId(items[0].id.videoId);
      }
    }
  }, [ytData, randomize]);
  return isFetching ? (
    <YoutubeLoader />
  ) : (
    <YouTube
      videoId={videoId}
      opts={{
        ...playerSizes,
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 0,
        },
      }}
    />
  );
};
