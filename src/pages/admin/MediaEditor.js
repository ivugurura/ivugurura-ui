import React from 'react';

import {
  Card, CardContent, CardHeader, Grid, Typography,
} from '@mui/material';
import AudioPlayer from 'react-h5-audio-player';

import { RRVTable } from '../../common/components/RRVTable/Table';

import { audioColumns } from './columns/audioColumns';
import { DashboardContainer } from './components/DashboardContainer';

const audios = [{
  title: 'Ikirema', type: 'Audio', author: 'Muhagururke tugorore', downloads: 2, shares: 34,
}];
export const MediaEditor = () => {
  console.log('MediaEditor');
  return (
    <DashboardContainer title="All media">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={8}>
          <RRVTable columns={audioColumns()} data={audios} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <AudioPlayer
              autoPlay
              src="http://example.com/audio.mp3"
              onPlay={() => console.log('onPlay')}
            />
            <CardHeader
              title="to Scott, Alex, Jennifer"
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
            <CardContent>Kinyarwanda</CardContent>
            <CardContent>Saturday, Dec 25, 2023</CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
