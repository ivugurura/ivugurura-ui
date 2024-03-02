/* eslint-disable no-unused-vars */
import React from 'react';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Paper,
} from '@mui/material';
import SunEditor from 'suneditor-react';

import { RRVEditor } from '../../../common/components/RRVEditor';
import { RRVSunEditor } from '../../../common/components/RRVEditor/SunEditor';

export const TopicDetails = ({
  topic,
  editorState,
  setEditorState,
  sunEdContent,
  setSunEdContent,
}) => {
  console.log('Topic Details');
  return (
    <Card>
      <CardHeader title="Topic detail" />
      <CardContent>
        <Paper component={Box} mt={3}>
          {/* <RRVEditor
            placeholder="Type topic details here"
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbarCustomButtons={[<Button>Insert image</Button>]}
          /> */}
          <RRVSunEditor
            topic={topic}
            sunEdContent={sunEdContent}
            setSunEdContent={setSunEdContent}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
