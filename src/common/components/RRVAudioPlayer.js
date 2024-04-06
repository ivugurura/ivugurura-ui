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
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  ButtonGroup,
} from '@mui/material';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import { DL_ROUTE, toAssetPath } from '../../helpers/utils/constants';
import { actions, initials } from '../../redux/apiSliceBuilder';

import { RRVShare } from './RRVShare';

export const RRVAudioPlayer = () => {
  const [currentAudio, setCurrentAudio] = useState({ index: -1, audio: null });
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
  const customControls = [
    RHAP_UI.LOOP,
    <Button
      size="small"
      disabled={currentAudio.index === 0}
      onClick={() => handleNewAudio('prev')}
    >
      <SkipPrevious />
    </Button>,
    <Button
      size="small"
      disabled={currentAudio.index === (audios?.length || 0) - 1}
      onClick={() => handleNewAudio()}
    >
      <SkipNext />
    </Button>,
  ];
  //   const DL_ROUTE = `${process.env.REACT_APP_API_URL}/api/v1/albums/download/`;
  console.log({ audios });
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
                  {`By ${currentAudio.audio.author}`}
                </Typography>
                {" — Wish I could come, but I'm out of town this…"}
              </>
            }
          />
        </>
      )}
      <CardContent>
        <List>
          {audios?.map((audio, audioIdx) => (
            <>
              <ListItem
                key={audio.id}
                selected={audio.id === currentAudio.audio?.id}
                secondaryAction={
                  <IconButton edge="end">
                    <ButtonGroup size="small">
                      <Button
                        startIcon={<PlayArrow />}
                        onClick={() =>
                          setCurrentAudio({ index: audioIdx, audio })
                        }
                      >
                        Play
                      </Button>
                      <Button
                        startIcon={<DownloadIcon />}
                        target="_blank"
                        rel="noreferrer"
                        href={DL_ROUTE + audio.slug}
                      >
                        Download
                      </Button>
                      <RRVShare
                        title={audio.title}
                        href={DL_ROUTE + audio.slug}
                        onShare={() => shareSong({ slug: audio.slug })}
                      />
                    </ButtonGroup>
                  </IconButton>
                }
                alignItems="flex-start"
              >
                <ListItemIcon>
                  <MusicNote />
                </ListItemIcon>
                <ListItemText
                  primary={audio.title}
                  secondary={`By ${audio.author}`}
                />
              </ListItem>
              <Divider variant="insert" component="li" />
            </>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
