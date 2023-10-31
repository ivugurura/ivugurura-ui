import React from 'react';

import {
  Box, Button, Card, CardContent, CardHeader, Paper,
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
            toolbarCustomButtons={[<Button>Insert image</Button>]}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
