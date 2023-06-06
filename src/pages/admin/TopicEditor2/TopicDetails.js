import React from 'react';

import {
  Box, Card, CardContent, CardHeader, Paper,
} from '@mui/material';

import { RRVEditor } from '../../../common/components/RRVEditor';

export const TopicDetails = ({ editorState, setEditorState }) => {
  console.log('Topic Details');
  return (
    <Card>
      <CardHeader title="Topic detail" />
      <CardContent>
        <Paper component={Box} mt={3}>
          <RRVEditor
            placeholder="Type topic details here"
            editorState={editorState}
            onEditorStateChange={setEditorState}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
