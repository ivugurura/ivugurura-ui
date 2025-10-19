import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { toLink } from '../../../helpers/utils/constants';
import { setFilePath } from '../../../redux/actions';
import { actions, initials } from '../../../redux/apiSliceBuilder';

import { AboutTopic } from './AboutTopic';
import { CoverImage } from './CoverImage';
import { Header } from './Header';
import { TopicDetails } from './TopicDetails';
import { TopicEditPreview } from './TopicEditPreview';

const initialValues = { title: '', categoryId: '' };
const TopicEditor2 = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const { topicSlug } = useParams();
  const [sunEdContent, setSunEdContent] = useState('');

  const [open, setOpen] = useState({ addImg: false, preview: false });

  const filePathName = useSelector((state) => state.filer.fileName);

  const [createTopic, res] = actions.useCreateTopicMutation();
  const [updateTopic, updateRes] = actions.useUpdateTopicMutation();
  const { data, isFetching } = actions.useViewTopicQuery({ slug: topicSlug });
  const { data: topic } = data || initials.dataObj;

  useEffect(() => {
    if (topicSlug && topic) {
      const { title, categoryId, content, coverImage, slug } = topic;
      setValues({ slug, title, categoryId });
      setSunEdContent(content);
      dispatch(setFilePath(coverImage));
    }
  }, [topicSlug, topic]);

  useEffect(() => {
    if (res.isSuccess || updateRes.isSuccess) {
      setValues(initialValues);
      setSunEdContent('');
      res.reset();
      updateRes.reset();
      navigate(toLink('', true));
    }
  }, [res.isSuccess, updateRes.isSuccess]);

  const handleOpen = (field, value) => {
    setOpen((pv) => ({ ...pv, [field]: value }));
  };

  const handleSave = () => {
    const { slug, ...rest } = values;
    const payload = {
      ...rest,
      content: sunEdContent,
      coverImage: filePathName,
    };
    if (slug) {
      return updateTopic({ ...payload, slug });
    }
    return createTopic(payload);
  };
  console.log({ isFetching });
  const isLoading = res.isLoading || updateRes.isLoading;
  return (
    <>
      <Header />
      <AboutTopic values={values} setValues={setValues} />
      <CoverImage
        open={open.addImg}
        handleClose={() => handleOpen('addImg', false)}
      />
      <Button onClick={() => handleOpen('addImg', true)}>
        {t('admin.topic.addImage')}
      </Button>
      <TopicDetails
        topic={values}
        setContents={sunEdContent}
        setSunEdContent={setSunEdContent}
        onChange={(content) => setSunEdContent(content)}
      />
      <Button onClick={() => handleOpen('preview', true)}>
        {t('actions.btnPreview')}
      </Button>
      <TopicEditPreview
        open={open.preview}
        onClose={() => handleOpen('preview', false)}
        topic={{ ...values, content: sunEdContent, coverImage: filePathName }}
      />
      <Button disabled={isLoading} onClick={handleSave}>
        {t(`actions.${isLoading ? 'loading' : 'btnSave'}`)}
      </Button>
    </>
  );
};

export default TopicEditor2;
