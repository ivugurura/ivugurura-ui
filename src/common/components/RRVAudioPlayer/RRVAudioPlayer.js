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
  // Button,
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
// import { Link } from 'react-router-dom';

import {
  dateFormat,
  DL_ROUTE,
  toAssetPath,
} from '../../../helpers/utils/constants';
import SearchBar from '../../../pages/components/searchBar';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { usePagination } from '../../hooks/usePagination';
import { useStyles } from '../../styles/index';
// import { useLang } from '../providers';
import { RRVPagination } from '../RRVPagination';
import { RRVShare } from '../RRVShare';

import { AudioVisualizer } from './audioVisualizerBar';

export const RRVAudioPlayer = ({
  // hasMore,
  nOfAudios = 3,
}) => {
  const { t } = useTranslation();
  // const { lang } = useLang();
  const [currentAudio, setCurrentAudio] = useState({ index: -1, audio: null });
  const { isMobile } = useMediaQuery();
  const [shareSong] = actions.useShareAudioMutation();
  const [volume, setVolume] = useState(0);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const audioPlayerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const {
    pagination: { page, pageSize, tablePage },
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination();
  const { data, isFetching } = actions.useListAudiosQuery({
    page,
    pageSize: nOfAudios,
  });
  const { data: audios, totalItems } = data || initials.dataArr;

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
  const handlePlayPause = async (audio) => {
    try {
      if (!audio) return;

      if (!currentAudio.audio || audio.id !== currentAudio.audio.id) {
        setCurrentAudio({
          index: audios.findIndex((a) => a.id === audio.id),
          audio,
        });
        setIsPlaying(true);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (audioPlayerRef.current) {
          if (isPlaying) {
            audioPlayerRef.current.audio.current.pause();
          } else {
            audioPlayerRef.current.audio.current.play();
          }
          setIsPlaying(!isPlaying);
        }
      }
    } catch (error) {
      console.error('Error handling audio:', error);
      setIsPlaying(false);
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
    <Box px={8}>
      <Box display="flex" flexDirection="column" alignItems="center" py={4}>
        <Typography variant="subtitle2" py={4}>
          {t('audio').toUpperCase()}
        </Typography>
        <Typography variant="h1" fontWeight={800}>
          {t('listenAudio').toUpperCase()}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={4} sm={12} xs={12} sx={useStyles.cardContainer}>
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
                    <img
                      src="/img/audio.svg"
                      alt=""
                      style={{
                        width: '100%',
                        maxWidth: isMobile && '90px',
                        height: 'auto',
                      }}
                    />
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
        <Grid item md={7.8} sm={12} xs={12}>
          <SearchBar />
          <List>
            {audios?.map((audio) => {
              const isCurrent = audio.id === currentAudio.audio?.id;
              return (
                <React.Fragment key={audio.id}>
                  <ListItem
                    onClick={() => handlePlayPause(audio)}
                    sx={{
                      ...useStyles.listItem,
                      ...(isCurrent && useStyles.selectedListItem),
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: { xs: 2, sm: 0 },
                    }}
                    key={audio.id}
                    secondaryAction={
                      <Box
                        size="small"
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        alignItems="center"
                        gap={1}
                        // orientation={isMobile ? 'vertical' : 'horizontal'}
                      >
                        <IconButton
                          onClick={() => handlePlayPause(audio)}
                          sx={useStyles.listIcon}
                        >
                          {isCurrent && isPlaying ? <Pause /> : <PlayArrow />}
                        </IconButton>

                        <IconButton
                          target="_blank"
                          rel="noreferrer"
                          href={DL_ROUTE + audio.slug}
                        >
                          <FileDownloadOutlined
                            sx={useStyles.listIcon}
                            fontSize="small"
                          />
                        </IconButton>
                        <RRVShare
                          title={audio.title}
                          href={DL_ROUTE + audio.slug}
                          onShare={() => shareSong({ slug: audio.slug })}
                        />
                      </Box>
                    }
                    alignItems="flex-start"
                  >
                    <ListItemIcon
                      sx={{ minWidth: isMobile ? undefined : '56px' }}
                    >
                      <AudioVisualizer isPlaying={isPlaying && isCurrent} />
                    </ListItemIcon>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'flex-start', sm: 'center' },
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

      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <RRVPagination
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          dataCount={totalItems}
          page={tablePage}
          pageSize={pageSize}
          labelRowsPerPage="N audios per page:"
        />
        {/* <Box textAlign="center" paddingTop={2}>
            <Button component={Link} to={`/${lang}/audios`}>
              {t('actions.viewMoreAudios')}
            </Button>
          </Box> */}
      </Grid>
    </Box>
  );
};
