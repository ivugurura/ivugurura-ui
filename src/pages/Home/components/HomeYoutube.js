import React, { useEffect } from 'react';

import YouTube from 'react-youtube';

import { useWindowSize } from '../../../common/hooks/useWindowSize';
// import { actions } from '../../../redux/actions';

import { YoutubeLoader } from './HomeLoaders';

export const HomeYoutube = ({
  widthRatio = 0.5,
  heightRatio = 0.47,
  normalHeight = 370,
  randomize = false,
}) => {
  const [videoId, setVideoId] = React.useState('-PweyZWNcLk');
  const [playerSizes, setPlayerSizes] = React.useState({});
  const { width: winWidth, height: winHeight } = useWindowSize();
  // const { data: ytData, isFetching } = actions.useListYoutubesQuery();
  const { data: ytData, isFetching } = {
    data: { items: [], isFetching: false },
  };
  useEffect(() => {
    let height = heightRatio * winHeight;
    let width = widthRatio * winWidth;
    if (winWidth < 900) {
      width = winWidth;
    }
    if (winHeight < 789) {
      height = normalHeight;
    }
    setPlayerSizes({ height, width });
  }, [widthRatio, heightRatio, normalHeight]);

  useEffect(() => {
    if (ytData?.items.length > 0) {
      if (randomize) {
        const randomIndex = Math.floor(Math.random() * ytData.items.length);
        setVideoId(ytData.items[randomIndex].id.videoId);
      } else {
        setVideoId(ytData.items[0].id.videoId);
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
