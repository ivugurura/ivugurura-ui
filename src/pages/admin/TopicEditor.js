import React, { useState } from 'react';

import {
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
        </Grid>
        <Grid
          xs={12}
          lg={7}
        >
          <RRVEditor editorState={editorState} onEditorStateChange={setEditorState} />
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};
