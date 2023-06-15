import React, { useState } from 'react';

import { Button } from '@mui/material';
import { EditorState } from 'draft-js';

import { PageHelmet } from '../../../common/components/PageHelmet';

import { AboutTopic } from './AboutTopic';
import { Header } from './Header';
import { TopicDetails } from './TopicDetails';

export const TopicEditor2 = () => {
  console.log(' Topic editor 2');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  return (
    <PageHelmet title="Edit page title">
      <Header />
      <AboutTopic />
      <TopicDetails editorState={editorState} setEditorState={setEditorState} />
      <Button>View</Button>
      <Button>Save</Button>
    </PageHelmet>
  );
};
