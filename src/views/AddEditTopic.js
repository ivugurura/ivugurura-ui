import React, { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import {
  Card,
  Button,
  FormControl,
  Row,
  Col,
  Container
} from 'react-bootstrap';
import ImageUploader from 'react-images-upload';
import { topicEditorButtons } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/actions';
// import { FileUploader } from '../components';
import { addTopic, getTopicDetail, updateTopic } from '../redux/actions/topics';
import { toast } from 'react-toastify';
import { uploadedFile } from '../helpers/utils';

const topicValues = {
  title: '',
  categoryId: '',
  description: '',
  coverImage: ''
};
export const AddEditTopic = ({ history, match }) => {
  const { topicSlug } = match.params;
  const [topic, setTopic] = useState(topicValues);
  const [sunEdContent, setSunEdContent] = useState('');
  const [uploading, setUploading] = useState(false);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { category, oneTopic } = useSelector(({ category, oneTopic }) => ({
    category,
    oneTopic
  }));
  const { topicFetched, newTopicAdded, topicUpdated } = oneTopic;
  useEffect(() => {
    dispatch(getCategories('/'));
    if (newTopicAdded || topicUpdated) {
      setSunEdContent('');
      toast(`${topic.title.toUpperCase()} has saved`);
      setTimeout(() => {
        history.goBack();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTopicAdded, topicUpdated]);
  useEffect(() => {
    if (topicSlug) {
      dispatch(getTopicDetail(topicSlug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicSlug]);
  useEffect(() => {
    if (topicSlug && topicFetched) {
      const {
        title,
        description,
        categoryId,
        content,
        coverImage
      } = oneTopic.topic;
      setTopic({ title, description, categoryId, coverImage });
      setHasUploaded(true);
      setSunEdContent(content);
    }
  }, [topicSlug, topicFetched, oneTopic.topic]);
  const onInputChange = ({ target }) => {
    setTopic({ ...topic, [target.name]: target.value });
  };
  const onSaveChange = async () => {
    topic.content = sunEdContent;
    if (!hasUploaded) {
      if (!file)
        return toast('Please select image', { type: toast.TYPE.ERROR });
      setUploading(true);
      const prevFile = topicSlug ? topic.coverImage : '';
      const imagePath = await uploadedFile(file, prevFile);
      if (imagePath) {
        setHasUploaded(true);
        setUploading(false);
        topic.coverImage = imagePath;
      }
    }
    if (topicSlug) {
      dispatch(updateTopic(topic, topicSlug));
    } else {
      dispatch(addTopic(topic));
    }
  };
  return (
    <Container fluid className='mt-2'>
      <h4 className='text-center'>
        {topicSlug
          ? oneTopic.topicLoading
            ? 'LOADING...'
            : `Update ${oneTopic.topic.title}`
          : `Add topic or PAST IT HERE`}
      </h4>
      <Card>
        <Card.Header>
          <Card.Title>
            <Row>
              <Col xs={12} md={3} lg={3}>
                <FormControl
                  type='text'
                  placeholder='Topic title'
                  name='title'
                  value={topic.title}
                  onChange={onInputChange}
                />
              </Col>
              <Col xs={12} md={3} lg={3}>
                <FormControl
                  as='select'
                  name='categoryId'
                  value={topic.categoryId}
                  onChange={onInputChange}
                >
                  <option>Select category</option>
                  {category.loading ? (
                    <option>Loading</option>
                  ) : (
                    category.categories.map((category, categoryIndex) => (
                      <option key={categoryIndex} value={category.id}>
                        {category.name}
                      </option>
                    ))
                  )}
                </FormControl>
              </Col>
              <Col xs={12} md={6} lg={6}>
                <FormControl
                  type='text'
                  placeholder='Topic description'
                  name='description'
                  value={topic.description}
                  onChange={onInputChange}
                />
              </Col>
            </Row>
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={9} lg={9}>
              <SunEditor
                setOptions={{
                  height: 230,
                  buttonList: topicEditorButtons
                }}
                setDefaultStyle='font-size: 16px;'
                name='content'
                value={topic.content}
                setContents={sunEdContent}
                placeholder='Please type here...'
                onChange={(content) => setSunEdContent(content)}
              />
            </Col>
            <Col xs={12} md={3} lg={3}>
              {/* <FileUploader coverImage={topic.coverImage} /> */}
              <Row>
                {!hasUploaded ? (
                  <Col xs={12} md={12} lg={12}>
                    <ImageUploader
                      withIcon
                      buttonText='Choose images'
                      imgExtension={['.jpg', '.gif', '.png', '.gif']}
                      withPreview
                      withLabel
                      singleImage
                      maxFileSize={5242880}
                      onChange={(images) => setFile(images[0])}
                    />
                  </Col>
                ) : (
                  <Col xs={12} md={12} lg={12}>
                    <div className='text-center'>
                      <Button onClick={() => setHasUploaded(false)}>
                        Change cover image?
                      </Button>
                      <img
                        src={`${process.env.REACT_APP_API_URL}/images/${topic.coverImage}`}
                        className='img-fluid img-thumbnail'
                        alt='Topic cover'
                      />
                    </div>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button variant='outline-secondary' onClick={() => history.goBack()}>
            Cancel
          </Button>
          {topicSlug ? (
            <Button
              variant='primary'
              onClick={onSaveChange}
              disabled={uploading || oneTopic.topicUpdating}
            >
              {oneTopic.topicUpdating
                ? 'Saving... Please wait'
                : `Update ${topic.title}`}
            </Button>
          ) : (
            <Button
              variant='primary'
              onClick={onSaveChange}
              disabled={uploading || oneTopic.newTopicLoading}
            >
              {uploading
                ? 'Uploading cover image,...'
                : oneTopic.newTopicLoading
                ? 'Saving... Please wait'
                : 'Save topic'}
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
};
