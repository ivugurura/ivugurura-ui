import React, { useState } from 'react';

import { Button } from '@mui/material';
import { EditorState } from 'draft-js';

import { PageHelmet } from '../../../common/components/PageHelmet';

import { AboutTopic } from './AboutTopic';
import { CoverImage } from './CoverImage';
import { Header } from './Header';
import { TopicDetails } from './TopicDetails';

export const TopicEditor2 = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [openAddImg, setOpenAddImg] = useState(false);
  return (
    <PageHelmet title="Edit page title">
      <Header />
      <AboutTopic />
      <CoverImage open={openAddImg} handleClose={() => setOpenAddImg(false)} />
      <Button onClick={() => setOpenAddImg(true)}>Add cover image</Button>
      <TopicDetails editorState={editorState} setEditorState={setEditorState} />
      <Button>View</Button>
      <Button>Save</Button>
    </PageHelmet>
  );
};
