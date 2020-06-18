import React, { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import {
  Card,
  Button,
  FormControl,
  Row,
  Col,
  Container,
} from 'react-bootstrap';
import { topicEditorButtons } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/actions';
import { FileUploader } from '../components';
import { addTopic, getTopicDetail, updateTopic } from '../redux/actions/topics';
import { toast } from 'react-toastify';

export const AddEditTopic = ({ history, match }) => {
  const { topicSlug } = match.params;
  const [topic, setTopic] = useState({
    title: '',
    categoryId: '',
    description: '',
    coverImage: '',
  });
  const [sunEdContent, setSunEdContent] = useState('');
  const dispatch = useDispatch();
  const { category, filer, oneTopic } = useSelector(
    ({ category, filer, oneTopic }) => ({
      category,
      filer,
      oneTopic,
    })
  );
  const { topicFetched, newTopicAdded, topicUpdated } = oneTopic;
  useEffect(() => {
    dispatch(getCategories('/'));
    if (newTopicAdded || topicUpdated) {
      toast(`${topic.title.toUpperCase()} has saved`);
      setTimeout(() => {
        history.goBack();
      }, 3000);
    }
    if (topicSlug && !topicFetched) {
      dispatch(getTopicDetail(topicSlug));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategories, getTopicDetail, topicSlug, newTopicAdded, topicUpdated]);
  useEffect(() => {
    if (topicSlug && topicFetched) {
      const {
        title,
        description,
        categoryId,
        content,
        coverImage,
      } = oneTopic.topic;
      setTopic({ title, description, categoryId, coverImage });
      setSunEdContent(content);
    }
  }, [topicSlug, topicFetched, oneTopic.topic]);
  const onInputChange = ({ target }) => {
    setTopic({ ...topic, [target.name]: target.value });
  };
  const onSaveChange = () => {
    topic.content = sunEdContent;
    if (topicSlug) {
      if (filer.coverImagePath) topic.coverImage = filer.coverImagePath;
      dispatch(updateTopic(topic, topicSlug));
    } else {
      topic.coverImage = filer.coverImagePath;
      dispatch(addTopic(topic));
    }
    console.log(topic);
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
                  buttonList: topicEditorButtons,
                  height: 230,
                }}
                name='content'
                value={topic.content}
                setContents={sunEdContent}
                placeholder='Please type here...'
                onChange={(content) => setSunEdContent(content)}
              />
            </Col>
            <Col xs={12} md={3} lg={3}>
              <FileUploader coverImage={topic.coverImage} />
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
              disabled={oneTopic.topicUpdating}
            >
              {oneTopic.topicUpdating
                ? 'Saving... Please wait'
                : `Update ${oneTopic.topic.title}`}
            </Button>
          ) : (
            <Button
              variant='primary'
              onClick={onSaveChange}
              disabled={oneTopic.newTopicLoading}
            >
              {oneTopic.newTopicLoading
                ? 'Saving... Please wait'
                : 'Save topic'}
            </Button>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
};
