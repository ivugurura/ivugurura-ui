import React, { useEffect, useRef, useState } from 'react';

import {
  ArrowOutward,
  FileDownloadOutlined,
  PauseCircle,
  PlayCircle,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import {
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  IconButton,
  Skeleton,
  List,
  ListItem,
  Slider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { useLang } from '../../../common/components';
import { RadioKing } from '../../../common/components/Radio';
import AudioPlay from '../../../common/components/RRVAudioPlayer/audio';
import { AudioVisualizer } from '../../../common/components/RRVAudioPlayer/audioVisualizerBar';
import { RRVShare } from '../../../common/components/RRVShare';
import { useMediaQuery } from '../../../common/hooks/useMediaQuery';
import { useStyles } from '../../../common/styles/index';
import { palette } from '../../../common/theme/palette';
import {
  dateFormat,
  DL_ROUTE,
  toAssetPath,
} from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';

export const RadioHome = ({ nOfAudios = 2 }) => {
  const [currentAudio, setCurrentAudio] = useState({ index: -1, audio: null });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioPlayerRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const { isMobile } = useMediaQuery();
  const [shareSong] = actions.useShareAudioMutation();
  const { t } = useTranslation();
  const { lang } = useLang();
  const [showVolumeControl, setShowVolumeControl] = useState(null);
  const volumeControlRef = useRef(null);
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
  const handlePlayPause = async (audio) => {
    try {
      if (audio.id !== currentAudio.audio?.id) {
        setIsPlaying(false);

        const newAudio = new Audio(toAssetPath(audio.mediaLink, false));

        if (audioPlayerRef.current) {
          audioPlayerRef.current.pause();
          audioPlayerRef.current.src = '';
          audioPlayerRef.current.load();
        }

        audioPlayerRef.current = newAudio;
        setCurrentAudio({
          index: audios.findIndex((a) => a.id === audio.id),
          audio,
        });

        await newAudio.play();
        setIsPlaying(true);
      } else {
        if (isPlaying) {
          await audioPlayerRef.current?.pause();
        } else {
          await audioPlayerRef.current?.play();
        }
        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error('Error handling audio:', error);
    }
  };

  useEffect(() => {
    return () => {
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current.src = '';
      }
    };
  }, []);

  const handleVolumeChange = (_, newValue) => {
    const volumeValue = newValue / 100;
    setVolume(volumeValue);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.volume = volumeValue;
    }
  };
  const toggleVolumeControl = (audioId, event) => {
    event.stopPropagation();
    setShowVolumeControl(showVolumeControl === audioId ? null : audioId);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        volumeControlRef.current &&
        !volumeControlRef.current.contains(event.target)
      ) {
        setShowVolumeControl(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  return (
    <Box px={8}>
      <Box display="flex" justifyContent="center" pb={4}>
        <Typography variant="subtitle2" fontWeight={700} fontSize={36}>
          {t('logoTitle').toUpperCase()}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <Typography variant="subtitle2" fontWeight={700} fontSize={26} pb={4}>
            {t('latestAudio')}
          </Typography>
          <Card sx={useStyles.cardAudio}>
            <CardContent>
              {isFetching ? (
                <>
                  <Skeleton variant="rectangle" />
                  <Skeleton variant="rectangle" />
                  <Skeleton variant="rectangle" />
                </>
              ) : (
                currentAudio.audio && (
                  <Box display="flex" justifyContent="space-between">
                    <Box>
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
                    </Box>
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
                    <AudioPlay
                      ref={audioPlayerRef}
                      src={toAssetPath(currentAudio.audio.mediaLink, false)}
                      autoPlay={false}
                      preload="auto"
                    />
                  </Box>
                )
              )}
              <List>
                {audios?.map((audio) => {
                  const isCurrent = audio.id === currentAudio.audio?.id;
                  return (
                    <React.Fragment key={audio.id}>
                      <ListItem
                        onClick={() => handlePlayPause(audio)}
                        sx={useStyles.listOverview}
                        key={audio.id}
                        secondaryAction={
                          <Box
                            size="small"
                            display="flex"
                            // orientation={isMobile ? 'vertical' : 'horizontal'}
                          >
                            <Box>
                              <IconButton
                                sx={useStyles.overviewIcon}
                                onClick={(e) =>
                                  toggleVolumeControl(audio.id, e)
                                }
                              >
                                {volume === 0 ? (
                                  <VolumeOff fontSize="small" />
                                ) : (
                                  <VolumeUp fontSize="small" />
                                )}
                              </IconButton>
                              {showVolumeControl === audio.id && (
                                <Box
                                  pt={3}
                                  sx={useStyles.volumeContainer}
                                  ref={volumeControlRef}
                                >
                                  <Slider
                                    value={volume * 100}
                                    onChange={handleVolumeChange}
                                    aria-label="Volume"
                                    sx={useStyles.slider}
                                  />
                                </Box>
                              )}
                            </Box>

                            <IconButton
                              target="_blank"
                              rel="noreferrer"
                              href={DL_ROUTE + audio.slug}
                            >
                              <FileDownloadOutlined
                                sx={useStyles.overviewIcon}
                                fontSize="small"
                              />
                            </IconButton>
                            <RRVShare
                              title={audio.title}
                              href={DL_ROUTE + audio.slug}
                              onShare={() => shareSong({ slug: audio.slug })}
                              color={palette.white}
                            />
                          </Box>
                        }
                        alignItems="flex-start"
                      >
                        <ListItemIcon
                          sx={{ minWidth: isMobile ? undefined : '56px' }}
                        >
                          <AudioVisualizer
                            isPlaying={isPlaying && isCurrent}
                            background={
                              isPlaying && isCurrent
                                ? palette.green
                                : palette.listGrey
                            }
                          />
                          <Box
                            px={1}
                            sx={useStyles.audioText}
                            onClick={handlePlayPause}
                          >
                            {isPlaying && isCurrent ? (
                              <PauseCircle fontSize="large" />
                            ) : (
                              <PlayCircle fontSize="large" />
                            )}
                          </Box>
                        </ListItemIcon>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            gap: 1,
                          }}
                        >
                          <ListItemText
                            primary={
                              <Typography
                                fontSize={14}
                                fontWeight={700}
                                color={
                                  isPlaying && isCurrent
                                    ? palette.green
                                    : palette.white
                                }
                              >
                                {audio.title}
                              </Typography>
                            }
                            color="#fff"
                            secondary={
                              <Typography
                                fontSize={12}
                                fontWeight={500}
                                color={palette.listGrey}
                              >
                                {t('by')} {audio.author}
                              </Typography>
                            }
                            sx={{ flex: 0.7 }}
                          />
                          <Typography
                            variant="subtitle2"
                            color={palette.listGrey}
                          >
                            {dateFormat(audio.createdAt)}
                          </Typography>
                        </Box>
                      </ListItem>
                    </React.Fragment>
                  );
                })}
              </List>

              <Grid
                container
                direction="column"
                justifyContent="flex-end"
                alignItems="flex-end"
              >
                <Box textAlign="center">
                  <Button
                    component={Link}
                    to={`/${lang}/audios`}
                    sx={useStyles.white}
                    endIcon={<ArrowOutward fontSize="small" />}
                  >
                    {t('actions.viewMoreAudios')}
                  </Button>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="subtitle2" fontWeight={700} fontSize={26} pb={4}>
            {t('radio')}
          </Typography>
          <RadioKing />
          <Box>
            {t('radioMsg')}
            <Button endIcon={<ArrowOutward fontSize="small" />}>
              {t('listenRadio')}
            </Button>
          </Box>
        </Grid>

        {/* <Radio /> */}
      </Grid>
    </Box>
  );
};
