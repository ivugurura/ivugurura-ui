import React from 'react';

import {
  FileDownloadOutlined,
  PauseCircle,
  PlayCircle,
  VolumeOff,
  VolumeUp,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { dateFormat, DL_ROUTE } from '../../../helpers/utils/constants';
import { actions } from '../../../redux/apiSliceBuilder';
import { useStyles } from '../../styles';
import { RRVShare } from '../RRVShare';

import { AudioVisualizer } from './audioVisualizerBar';
import { useRRVAudioPlayerCtx } from './provider';

export const AudioList = ({ audios, currentAudio, setCurrentAudio }) => {
  const [shareSong] = actions.useShareAudioMutation();
  const { t } = useTranslation();
  const { volume, isPlaying } = useRRVAudioPlayerCtx();

  return (
    <List>
      {audios?.map((audio, index) => {
        const isCurrent = audio.id === currentAudio.audio?.id;
        return (
          <ListItem
            key={audio.id}
            onClick={() => setCurrentAudio({ audio, index })}
            sx={{
              ...useStyles.listOverview,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 2, sm: 0 },
            }}
            secondaryAction={
              <Box
                size="small"
                display="flex"
                flexDirection={{ xs: 'column', sm: 'row' }}
                alignItems="center"
                gap={1}
              >
                <IconButton
                  sx={useStyles.overviewIcon}
                  onClick={() => setCurrentAudio({ audio, index })}
                >
                  {volume === 0 ? (
                    <VolumeOff fontSize="small" />
                  ) : (
                    <VolumeUp fontSize="small" />
                  )}
                </IconButton>
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
                  color={({ palette }) => palette.white}
                />
              </Box>
            }
            alignItems="flex-start"
          >
            <ListItemIcon
              sx={{
                minWidth: { xs: '40px', sm: '56px' },
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'center',
                gap: { xs: 1, sm: 0 },
              }}
            >
              <AudioVisualizer
                isPlaying={isPlaying && isCurrent}
                background={({ palette }) =>
                  isPlaying && isCurrent ? palette.green : palette.listGrey
                }
              />
              <Box
                px={1}
                sx={{
                  ...useStyles.audioText,
                  display: 'flex',
                  justifyContent: 'center',
                }}
                onClick={() => setCurrentAudio({ audio, index })}
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
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'flex-start', sm: 'center' },
                width: '100%',
                gap: 2,
              }}
            >
              <ListItemText
                primary={
                  <Typography
                    variant="subtitle2"
                    fontWeight={700}
                    color={({ palette }) =>
                      isPlaying && isCurrent ? palette.green : palette.white
                    }
                  >
                    {audio.title}
                  </Typography>
                }
                color="#fff"
                secondary={
                  <Typography
                    fontSize={{ xs: 10, sm: 12 }}
                    fontWeight={500}
                    color={({ palette }) => palette.listGrey}
                  >
                    {t('by')} {audio.author}
                  </Typography>
                }
                sx={{ flex: 0.7 }}
              />
              <Typography
                variant="subtitle2"
                fontSize={{ xs: 10, sm: 12 }}
                color={({ palette }) => palette.listGrey}
              >
                {dateFormat(audio.createdAt)}
              </Typography>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};
