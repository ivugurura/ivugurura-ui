import React, { useEffect, useRef, useState } from 'react';

import {
  SkipNext,
  SkipPrevious,
  PauseCircle,
  PlayCircle,
  VolumeUp,
  FileDownloadOutlined,
  VolumeOff,
  Loop,
  PlayArrow,
  Pause,
} from '@mui/icons-material';
import {
  Button,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  IconButton,
  Card,
  CardContent,
  Slider,
  ClickAwayListener,
} from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import {
  dateFormat,
  DL_ROUTE,
  toAssetPath,
} from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useStyles } from '../../styles/index';
import { useLang } from '../providers';
import { RRVShare } from '../RRVShare';

import { AudioVisualizer } from './audioVisualizerBar';

export const RRVAudioPlayer = ({
  displayText = true,
  hasMore,
  nOfAudios = 3,
}) => {
  const { t } = useTranslation();
  const { lang } = useLang();
  const [currentAudio, setCurrentAudio] = useState({ index: -1, audio: null });
  const { isMobile } = useMediaQuery();
  const [shareSong] = actions.useShareAudioMutation();
  const { data, isFetching } = actions.useListAudiosQuery({
    page: 1,
    pageSize: nOfAudios,
  });
  const { data: audios } = data || initials.dataArr;
  useEffect(() => {
    if (audios?.length > 0) {
      setCurrentAudio({ index: 0, audio: audios[0] });
    }
  }, [audios]);
  const handleNewAudio = (type = 'next') => {
    let newIndex = currentAudio.index + 1;
    if (type === 'prev') {
      newIndex = currentAudio.index - 1;
    }
    if (newIndex >= 0 && newIndex < audios.length) {
      setCurrentAudio({
        index: newIndex,
        audio: audios[newIndex],
      });
    }
  };

  const [volume, setVolume] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const handleVolumeChange = (_, newValue) => {
    const volumeValue = newValue / 100;
    setVolume(volumeValue);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.audio.current.volume = volumeValue;
    }
  };

  const toggleVolumeControl = () => {
    setShowVolumeControl((prev) => !prev);
  };

  const closeVolumeControl = () => {
    setShowVolumeControl(false);
  };
  const handlePlayPause = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.audio.current.pause();
      } else {
        audioPlayerRef.current.audio.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const handleLoop = () => {
    if (audioPlayerRef.current) {
      const audio = audioPlayerRef.current.audio.current;
      audio.loop = !isLooping;
      setIsLooping(!isLooping);
    }
  };
  const customControls = [
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100%',
      }}
    >
      <IconButton
        onClick={handleLoop}
        sx={isLooping ? useStyles.listIcon : useStyles.unloop}
      >
        <Loop />
      </IconButton>
      <IconButton
        sx={useStyles.listIcon}
        disabled={currentAudio.index === 0}
        onClick={() => handleNewAudio('prev')}
      >
        <SkipPrevious fontSize="large" />
      </IconButton>
      <IconButton onClick={handlePlayPause} sx={useStyles.listIcon}>
        {isPlaying ? (
          <PauseCircle fontSize="large" />
        ) : (
          <PlayCircle fontSize="large" />
        )}
      </IconButton>
      <IconButton
        sx={useStyles.listIcon}
        disabled={currentAudio.index === (audios?.length || 0) - 1}
        onClick={() => handleNewAudio()}
      >
        <SkipNext fontSize="large" />
      </IconButton>
      <ClickAwayListener onClickAway={closeVolumeControl}>
        <Box sx={{ position: 'relative' }}>
          <IconButton onClick={toggleVolumeControl}>
            {volume === 0 ? <VolumeOff /> : <VolumeUp />}
          </IconButton>
          {showVolumeControl && (
            <Box sx={useStyles.volumeContainer}>
              <Slider
                value={volume * 100}
                onChange={handleVolumeChange}
                aria-label="Volume"
                sx={useStyles.slider}
              />
            </Box>
          )}
        </Box>
      </ClickAwayListener>
      ,
    </Box>,
  ];

  return isFetching ? (
    'Loading'
  ) : (
    <Box>
      <Box display="flex" flexDirection="column" alignItems="center" py={4}>
        <Typography variant="subtitle2" py={4}>
          {t('audio').toUpperCase()}
        </Typography>
        <Typography variant="h1" fontWeight={800}>
          {t('listenAudio').toUpperCase()}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          {currentAudio.audio && (
            <>
              <Card sx={useStyles.cardAudio}>
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
                  <Box display="flex" justifyContent="space-between">
                    <img src="/img/audio.svg" alt="" />
                    <IconButton
                      sx={useStyles.audioText}
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? (
                        <PauseCircle fontSize="large" />
                      ) : (
                        <PlayCircle fontSize="large" />
                      )}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
              <Box sx={useStyles.playWrapper}>
                <AudioPlayer
                  muted
                  ref={audioPlayerRef}
                  showJumpControls={false}
                  volume={volume}
                  layout="stacked-reverse"
                  src={toAssetPath(currentAudio.audio.mediaLink, false)}
                  customAdditionalControls={[]}
                  customControlsSection={customControls}
                />
              </Box>
            </>
          )}
        </Grid>
        <Grid item xs={7.8}>
          <List>
            {audios?.map((audio, audioIdx) => {
              const isCurrent = audio.id === currentAudio.audio?.id;
              return (
                <React.Fragment key={audio.id}>
                  <ListItem
                    sx={{
                      ...useStyles.listItem,
                      ...(isCurrent && useStyles.selectedListItem),
                    }}
                    key={audio.id}
                    secondaryAction={
                      <Box
                        size="small"

                        // orientation={isMobile ? 'vertical' : 'horizontal'}
                      >
                        <IconButton
                          onClick={() =>
                            setCurrentAudio({ index: audioIdx, audio })
                          }
                          sx={useStyles.listIcon}
                        >
                          {isCurrent ? <Pause /> : <PlayArrow />}
                        </IconButton>

                        <IconButton
                          target="_blank"
                          rel="noreferrer"
                          href={DL_ROUTE + audio.slug}
                        >
                          {displayText && (
                            <FileDownloadOutlined
                              sx={useStyles.listIcon}
                              fontSize="small"
                            />
                          )}
                        </IconButton>
                        <RRVShare
                          title={audio.title}
                          href={DL_ROUTE + audio.slug}
                          onShare={() => shareSong({ slug: audio.slug })}
                          displayText={displayText}
                        />
                      </Box>
                    }
                    alignItems="flex-start"
                  >
                    <ListItemIcon
                      sx={{ minWidth: isMobile ? undefined : '56px' }}
                    >
                      <AudioVisualizer
                        isPlaying={isPlaying}
                        isCurrent={isCurrent}
                      />
                    </ListItemIcon>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        gap: 2,
                      }}
                    >
                      <ListItemText
                        primary={audio.title}
                        secondary={
                          <p>
                            {t('by')} {audio.author}
                          </p>
                        }
                        sx={{ flex: 0.5 }}
                      />
                      <Typography variant="subtitle2">
                        {dateFormat(audio.createdAt)}
                      </Typography>
                    </Box>
                  </ListItem>
                  <Divider variant="insert" component="li" />
                </React.Fragment>
              );
            })}
          </List>
        </Grid>
      </Grid>
      {hasMore && (
        <Grid
          container
          direction="column"
          justifyContent="flex-end"
          alignItems="flex-end"
        >
          <Box textAlign="center" paddingTop={2}>
            <Button component={Link} to={`/${lang}/audios`}>
              {t('actions.viewMoreAudios')}
            </Button>
          </Box>
        </Grid>
      )}
    </Box>
  );
};
