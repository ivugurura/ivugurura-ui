import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { EditorState } from 'draft-js';
// import { stateToHTML } from 'draft-js-export-html';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { PageHelmet } from '../../../common/components/PageHelmet';
import { setFilePath } from '../../../redux/actions';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { AboutTopic } from './AboutTopic';
import { CoverImage } from './CoverImage';
import { Header } from './Header';
import { TopicDetails } from './TopicDetails';
import { TopicEditPreview } from './TopicEditPreview';

const initialValues = { title: '', categoryId: '' };
export const TopicEditor2 = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState(initialValues);
  const { topicSlug } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [sunEdContent, setSunEdContent] = useState('');

  const [open, setOpen] = useState({ addImg: false, preview: false });

  const filePathName = useSelector((state) => state.filer.fileName);

  const [createTopic, res] = actions.useCreateTopicMutation();
  const { data, isFetching } = actions.useViewTopicQuery({ slug: topicSlug });
  const { data: topic } = data || initials.dataObj;

  useEffect(() => {
    if (topicSlug && topic) {
      setValues({ title: topic.title, categoryId: topic.categoryId });
      setSunEdContent(topic.content);
      dispatch(setFilePath(topic.coverImage));
    }
  }, [topicSlug, topic]);

  useEffect(() => {
    if (res.isSuccess) {
      setValues(initialValues);
      setSunEdContent('');
      res.reset();
    }
  }, [res.isSuccess]);

  const handleOpen = (field, value) => {
    setOpen((pv) => ({ ...pv, [field]: value }));
  };

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
      <CoverImage open={open.addImg} handleClose={() => handleOpen('addImg', false)} />
      <Button onClick={() => handleOpen('addImg', true)}>Add cover image</Button>
      <TopicDetails
        topic={values}
        editorState={editorState}
        setEditorState={setEditorState}
        sunEdContent={sunEdContent}
        setSunEdContent={setSunEdContent}
      />
      <Button onClick={() => handleOpen('preview', true)}>Preview</Button>
      <TopicEditPreview
        open={open.preview}
        onClose={() => handleOpen('preview', false)}
        topic={{ ...values, content: sunEdContent, coverImage: filePathName }}
      />
      <Button disabled={res.isLoading} onClick={handleSave}>{res.isLoading ? 'Saving...' : 'Save'}</Button>
    </PageHelmet>
  );
};
