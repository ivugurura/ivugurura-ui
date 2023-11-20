import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { EditorState } from 'draft-js';
// import { stateToHTML } from 'draft-js-export-html';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PageHelmet } from '../../../common/components/PageHelmet';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { AboutTopic } from './AboutTopic';
import { CoverImage } from './CoverImage';
import { Header } from './Header';
import { TopicDetails } from './TopicDetails';

const initialValues = { title: '', categoryId: '' };
export const TopicEditor2 = () => {
  const [values, setValues] = useState(initialValues);
  const { topicSlug } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [sunEdContent, setSunEdContent] = useState('');

  const [openAddImg, setOpenAddImg] = useState(false);

  const filePathName = useSelector((state) => state.filer.fileName);

  const [createTopic, res] = actions.useCreateTopicMutation();
  const { data, isFetching } = actions.useViewTopicQuery({ slug: topicSlug });
  const { data: topic } = data || initials.dataObj;

  useEffect(() => {
    if (res.isSuccess) {
      setValues(initialValues);
      setSunEdContent('');
      res.reset();
    }
  }, [res.isSuccess]);

  const handleSave = () => {
    const payload = {
      ...values,
      content: sunEdContent,
      coverImage: filePathName,
    };
    createTopic(payload);
  };
  console.log({ isFetching, topic });
  return (
    <PageHelmet title="Edit page title">
      <Header />
      <AboutTopic values={values} setValues={setValues} />
      <CoverImage open={openAddImg} handleClose={() => setOpenAddImg(false)} />
      <Button onClick={() => setOpenAddImg(true)}>Add cover image</Button>
      <TopicDetails
        topic={values}
        editorState={editorState}
        setEditorState={setEditorState}
        sunEdContent={sunEdContent}
        setSunEdContent={setSunEdContent}
      />
      <Button>Preview</Button>
      <Button disabled={res.isLoading} onClick={handleSave}>{res.isLoading ? 'Saving...' : 'Save'}</Button>
    </PageHelmet>
  );
};
