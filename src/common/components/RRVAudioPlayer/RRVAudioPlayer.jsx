import {
  ArrowOutward,
  Loop,
  PauseCircle,
  PlayCircle,
  SkipNext,
  SkipPrevious,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Slider,
  Typography,
} from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  dateFormat,
  toAssetPath,
  toLink,
} from '../../../helpers/utils/constants';
import { useStyles } from '../../styles/index';

import { AudioList } from './AudioList';
import { useRRVAudioPlayerCtx } from './provider';

export const RRVAudioPlayer = ({
  audios,
  currentAudio,
  setCurrentAudio,
  displayList = false,
  displayMore = false,
}) => {
  const {
    volume,
    isLooping,
    isPlaying,
    mute,
    loopAudio,
    playPauseAudio,
    changeVolume,
    changeIsPlaying,
    audioPlayerRef,
    changeMute,
  } = useRRVAudioPlayerCtx();
  const { t } = useTranslation();

  const changePlayingAudio = (type = 'next') => {
    let newIndex = currentAudio.index + 1;
    if (type === 'prev') {
      newIndex = currentAudio.index - 1;
    }
    if (newIndex >= 0 && newIndex < audios.length) {
      setCurrentAudio({
        index: newIndex,
        audio: audios[newIndex],
      });
      changeIsPlaying(true);
    }
  };

  const customControls = [
    <Box
      key="custom-controls"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <IconButton
        onClick={loopAudio}
        sx={isLooping ? useStyles.overviewIcon : useStyles.unloop}
      >
        <Loop />
      </IconButton>
      <IconButton
        sx={useStyles.overviewIcon}
        disabled={currentAudio.index === 0}
        onClick={() => changePlayingAudio('prev')}
      >
        <SkipPrevious fontSize="large" />
      </IconButton>
      <IconButton
        onClick={() => playPauseAudio(currentAudio.audio)}
        sx={useStyles.overviewIcon}
      >
        {isPlaying ? (
          <PauseCircle fontSize="large" />
        ) : (
          <PlayCircle fontSize="large" />
        )}
      </IconButton>
      <IconButton
        sx={useStyles.overviewIcon}
        disabled={currentAudio.index === (audios?.length || 0) - 1}
        onClick={() => changePlayingAudio('next')}
      >
        <SkipNext fontSize="large" />
      </IconButton>
      <Box sx={{ position: 'relative' }}>
        <IconButton
          sx={useStyles.overviewIcon}
          onClick={() => changeMute(!mute)}
        >
          {volume === 0 || mute ? <VolumeOff /> : <VolumeUp />}
        </IconButton>
        <Box sx={useStyles.volumeContainer}>
          <Slider
            value={volume * 100}
            onChange={changeVolume}
            aria-label="Volume"
            orientation="vertical"
            sx={useStyles.slider}
          />
        </Box>
      </Box>
    </Box>,
  ];

  return (
    <Card sx={useStyles.cardAudio}>
      {currentAudio.audio && (
        <CardContent>
          <Typography
            sx={useStyles.white}
            fontSize={20}
            fontWeight={600}
            letterSpacing={-1}
          >
            {currentAudio.audio?.title}
          </Typography>
          <Typography
            sx={useStyles.audioText}
            fontSize={16}
            fontWeight={500}
            py={2}
          >
            {currentAudio.audio.author} -{' '}
            {dateFormat(currentAudio.audio.createdAt)}
          </Typography>

          <Box sx={useStyles.playWrapper}>
            <AudioPlayer
              ref={audioPlayerRef}
              showJumpControls={false}
              volume={volume}
              layout="stacked-reverse"
              src={toAssetPath(currentAudio.audio.mediaLink, false)}
              customAdditionalControls={[]}
              customControlsSection={customControls}
            />
          </Box>
          {displayList && (
            <AudioList {...{ audios, currentAudio, setCurrentAudio }} />
          )}
          {displayMore && (
            <Grid
              container
              direction="column"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Box textAlign="center">
                <Button
                  component={Link}
                  to={toLink('audios')}
                  sx={useStyles.white}
                  endIcon={<ArrowOutward fontSize="small" />}
                >
                  {t('actions.viewMoreAudios')}
                </Button>
              </Box>
            </Grid>
          )}
        </CardContent>
      )}
    </Card>
  );
};
