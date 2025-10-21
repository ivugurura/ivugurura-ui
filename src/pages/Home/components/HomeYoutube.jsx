import React, { useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import YouTube from 'react-youtube';

import { useLang } from '../../../common/components/providers/LangProvider';
import { useWindowSize } from '../../../common/hooks/useWindowSize';
import { getYtbDefaultVideoId } from '../../../helpers/utils';
import { initials } from '../../../redux/apiSliceBuilder';

import { YoutubeLoader } from './HomeLoaders';

export const HomeYoutube = ({
  youtubeData = {},
  widthRatio = 0.485,
  heightRatio = 0.7,
  normalHeight = 360,
  randomize = false,
}) => {
  const [videoId, setVideoId] = React.useState('');
  const [playerSizes, setPlayerSizes] = React.useState({});
  const { width: winWidth, height: winHeight } = useWindowSize();
  const { data, isFetching } = youtubeData;
  const { data: ytData } = data || initials.dataObj;
  const { lang } = useLang();
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
  const { t } = useTranslation();
  return (
    <Box className="sermons" py={6}>
      {isFetching ? (
        <YoutubeLoader />
      ) : (
        <Box>
          <Box textAlign="center">
            <Typography variant="subtitle2" fontWeight={400} fontSize={14}>
              {t('watchListen').toUpperCase()}
            </Typography>
            <Typography variant="h1" fontWeight={700} py={3}>
              {' '}
              {t('watchLatest')}
            </Typography>
          </Box>

          <YouTube
            videoId={videoId || getYtbDefaultVideoId(lang)}
            iframeClassName="youtube"
            opts={{
              ...playerSizes,
              playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 0,
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
};
