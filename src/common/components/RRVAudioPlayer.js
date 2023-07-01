import React, { useEffect, useState } from 'react';

import {
  MusicNote, PlayArrow, SkipNext, SkipPrevious,
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
} from '@mui/material';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';

import { audioPath } from '../../helpers/utils';
import { actions } from '../../redux/apiSliceBuilder';

export const RRVAudioPlayer = () => {
  const [currentAudio, setCurrentAudio] = useState({ index: -1, audio: null });
  const { data: audios, isFetching } = actions.useListAudiosQuery();
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
  return isFetching ? 'Loading' : (
    <Card>
      <AudioPlayer
        onPlay={() => console.log('onPlay')}
        muted
        src={audioPath + currentAudio.mediaLink}
        customAdditionalControls={customControls}
      />
      <CardHeader
        title={currentAudio.audio?.title}
        subheader={(
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              by Ivugurura n ubugorozi
            </Typography>
            {" — Wish I could come, but I'm out of town this…"}
          </>
        )}
      />
      <CardContent>
        <List>
          {[1, 2, 3].map((item) => (
            <>
              <ListItem
                key={item}
                secondaryAction={(
                  <IconButton edge="end">
                    <PlayArrow />
                  </IconButton>
                          )}
                alignItems="flex-start"
              >
                <ListItemIcon>
                  <MusicNote />
                </ListItemIcon>
                <ListItemText primary="Song 1" secondary="Some description" />
              </ListItem>
              <Divider variant="insert" component="li" />
            </>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};
