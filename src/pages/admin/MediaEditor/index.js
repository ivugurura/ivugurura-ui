import React, { useEffect, useState } from 'react';

import {
  ButtonGroup, Button,
  Card, CardContent, CardHeader, Grid, Typography,
} from '@mui/material';
import moment from 'moment';
import AudioPlayer from 'react-h5-audio-player';

import { RRVTable } from '../../../common/components/RRVTable/Table';
import { toAssetPath } from '../../../helpers/utils/constants';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { audioColumns } from '../columns/audioColumns';
import { DashboardContainer } from '../components/DashboardContainer';

import { AddEditTopic } from './AddEditAlbum';

const initialEditorStates = { openAlbum: false, openMedia: false };
export const MediaEditor = () => {
  const [currentAudio, setCurrentAudio] = useState({ index: -1, audio: null });
  const [editorState, setEditorState] = useState(initialEditorStates);

  const { data, isFetching } = actions.useListAudiosQuery({ page: 1, pageSize: 3 });
  const { data: audios } = data || initials.dataArr;
  useEffect(() => {
    if (audios?.length > 0) {
      setCurrentAudio({ index: 0, audio: audios[0] });
    }
  }, [audios]);
  const { audio } = currentAudio;
  return (
    <DashboardContainer
      title="All media"
      action={(
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button>Add new media</Button>
          <Button onClick={() => setEditorState((prev) => ({ ...prev, openAlbum: true }))}>
            Add new album
          </Button>
        </ButtonGroup>
      )}
    >
      <AddEditTopic
        open={editorState.openAlbum}
        onClose={() => setEditorState((prev) => ({ ...prev, openAlbum: false }))}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <RRVTable columns={audioColumns()} data={audios} isLoading={isFetching} />
        </Grid>
        <Grid item xs={12} lg={4}>
          {audio && (
            <Card>
              <AudioPlayer
                src={toAssetPath(audio.mediaLink, false)}
                onPlay={() => console.log('onPlay')}
              />
              <CardHeader
                title={audio.title}
                subheader={(
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      by
                      {' '}
                      {audio.author}
                    </Typography>
                    {` — Language: ${audio.language?.name}, Album: ${audio.album?.name}`}
                  </>
              )}
              />
              <CardContent>{audio.language?.name}</CardContent>
              <CardContent>{moment(audio.actionDate).format('dddd, MMM D, YYYY')}</CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};