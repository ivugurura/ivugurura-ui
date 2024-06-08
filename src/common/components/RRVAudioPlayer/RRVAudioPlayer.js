import React, { useEffect, useState } from 'react';

import {
  MusicNote,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  Download as DownloadIcon,
} from '@mui/icons-material';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  ButtonGroup,
} from '@mui/material';
import moment from 'moment';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import { useTranslation } from 'react-i18next';

import { DL_ROUTE, toAssetPath } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { RRVShare } from '../RRVShare';

export const RRVAudioPlayer = ({ displayText = true }) => {
  const { t } = useTranslation();
  const [currentAudio, setCurrentAudio] = useState({ index: -1, audio: null });
  const { isMobile } = useMediaQuery();
  const [shareSong] = actions.useShareAudioMutation();
  const { data, isFetching } = actions.useListAudiosQuery({
    page: 1,
    pageSize: 3,
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
  console.log({ isMobile });
  const customControls = [
    RHAP_UI.LOOP,
    <Button
      size="small"
      disabled={currentAudio.index === 0}
      onClick={() => handleNewAudio('prev')}
      key="prev"
    >
      <SkipPrevious />
    </Button>,
    <Button
      size="small"
      disabled={currentAudio.index === (audios?.length || 0) - 1}
      onClick={() => handleNewAudio()}
      key="next"
    >
      <SkipNext />
    </Button>,
  ];
  return isFetching ? (
    'Loading'
  ) : (
    <Card>
      {currentAudio.audio && (
        <>
          <AudioPlayer
            muted
            src={toAssetPath(currentAudio.audio.mediaLink, false)}
            customAdditionalControls={customControls}
          />
          <CardHeader
            title={currentAudio.audio?.title}
            subheader={
              <>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  <i>{t('by')}</i>
                  <strong>{currentAudio.audio.author}</strong>
                </Typography>
                {` ${t('at')} ${moment(currentAudio.audio.createdAt).format(
                  'DD.MM.YYYY',
                )}`}
              </>
            }
          />
        </>
      )}
      <CardContent>
        <List>
          {audios?.map((audio, audioIdx) => (
            <React.Fragment key={audio.id}>
              <ListItem
                key={audio.id}
                selected={audio.id === currentAudio.audio?.id}
                secondaryAction={
                  <ButtonGroup
                    size="small"
                    // orientation={isMobile ? 'vertical' : 'horizontal'}
                  >
                    <Button
                      startIcon={<PlayArrow />}
                      onClick={() =>
                        setCurrentAudio({ index: audioIdx, audio })
                      }
                    >
                      {displayText && 'Play'}
                    </Button>
                    <Button
                      startIcon={<DownloadIcon />}
                      target="_blank"
                      rel="noreferrer"
                      href={DL_ROUTE + audio.slug}
                    >
                      {displayText && 'Download'}
                    </Button>
                    <RRVShare
                      title={audio.title}
                      href={DL_ROUTE + audio.slug}
                      onShare={() => shareSong({ slug: audio.slug })}
                      displayText={displayText}
                    />
                  </ButtonGroup>
                }
                alignItems="flex-start"
              >
                <ListItemIcon sx={{ minWidth: isMobile ? undefined : '56px' }}>
                  <MusicNote />
                </ListItemIcon>
                <ListItemText
                  primary={audio.title}
                  primaryTypographyProps={{ style: { width: '62%' } }}
                  secondary={
                    <>
                      <i>{t('by')}</i> {audio.author}
                    </>
                  }
                />
              </ListItem>
              <Divider variant="insert" component="li" />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
