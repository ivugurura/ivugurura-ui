import React, { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid, InputAdornment, MenuItem, TextField,
} from '@mui/material';
import { EditorState } from 'draft-js';

import { RRVEditor } from '../../common/components/RRVEditor';

import { DashboardContainer } from './components/DashboardContainer';

export const TopicEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <DashboardContainer title="Add a new topic">
      <Grid container spacing={1}>
        <Grid
          xs={12}
          lg={5}
        >
          <Card>
            <CardHeader title="About the topic" />
            <TextField
              id="title"
              label="Title"
              fullWidth
              InputProps={{
                startAdornment: <InputAdornment position="start">In Kinyarwanda</InputAdornment>,
              }}
            />
            <TextField
              id="category"
              select
              label="Category"
              sx={{ marginTop: '1rem' }}
              helperText="Please select topic category"
              fullWidth
            >
              <MenuItem value="">
                Select category
              </MenuItem>
            </TextField>
            <TextField
              id="description"
              label="Description"
              multiline
              sx={{ marginTop: '1rem' }}
              rows={4}
              fullWidth
            />
          </Card>
          <Card>
            <CardHeader title="Add cover image" />
            <CardContent>
              FilesDropzone currentFile= fileType=coverImage /
            </CardContent>
          </Card>
        </Grid>
        <Grid
          xs={12}
          lg={7}
          sx={{ boxSizing: 'border-box' }}
        >
          <RRVEditor editorState={editorState} onEditorStateChange={setEditorState} />
        </Grid>
        <Button>View</Button>
        <Button>Save</Button>
      </Grid>
    </DashboardContainer>
  );
};
