import React, { useState } from 'react';

import { Button } from '@mui/material';
import { EditorState } from 'draft-js';
// import { stateToHTML } from 'draft-js-export-html';
import { useSelector } from 'react-redux';

import { PageHelmet } from '../../../common/components/PageHelmet';
import { actions } from '../../../redux/apiSliceBuilder';

import { AboutTopic } from './AboutTopic';
import { CoverImage } from './CoverImage';
import { Header } from './Header';
import { TopicDetails } from './TopicDetails';

const initialValues = { title: '', categoryId: '' };
export const TopicEditor2 = () => {
  const [values, setValues] = useState(initialValues);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [openAddImg, setOpenAddImg] = useState(false);

  const filePathName = useSelector((state) => state.filer.fileName);

  const [createTopic, { isLoading: creating }] = actions.useCreateTopicMutation();

  const handleSave = () => {
    const payload = {
      ...values,
      content: editorState.getCurrentContent(),
      coverImage: filePathName,
    };
    console.log({ payload });
    createTopic(payload);
  };
  return (
    <PageHelmet title="Edit page title">
      <Header />
      <AboutTopic values={values} setValues={setValues} />
      <CoverImage open={openAddImg} handleClose={() => setOpenAddImg(false)} />
      <Button onClick={() => setOpenAddImg(true)}>Add cover image</Button>
      <TopicDetails editorState={editorState} setEditorState={setEditorState} />
      <Button>Preview</Button>
      <Button disabled={creating} onClick={handleSave}>{creating ? 'Saving...' : 'Save'}</Button>
    </PageHelmet>
  );
};
