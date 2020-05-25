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
import { addTopic, getTopicDetail } from '../redux/actions/topics';
import { toast } from 'react-toastify';

export const AddEditTopic = ({ history, match }) => {
  const { topicSlug } = match.params;
  const dispatch = useDispatch();
  const { category, filer, oneTopic } = useSelector(
    ({ category, filer, oneTopic }) => ({
      category,
      filer,
      oneTopic,
    })
  );
  const [topic, setTopic] = useState({
    title: '',
    categoryId: '',
    content: '',
    description: '',
  });
  useEffect(() => {
    dispatch(getCategories('/'));
    if (oneTopic.newTopicAdded) {
      toast(`${topic.title.toUpperCase()} has added`);
      setTimeout(() => {
        history.goBack();
      }, 5000);
    }
    if (topicSlug) {
      dispatch(getTopicDetail(topicSlug));
    }
    if (topicSlug && oneTopic.topicFetched) {
      console.log('topic fetched');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategories, oneTopic.topicFetched, topicSlug]);
  const onInputChange = (event) => {
    const theTopic = { ...topic };
    const theKey = event.target ? event.target.name : 'content';
    theTopic[theKey] = event.target ? event.target.value : event;
    setTopic(theTopic);
  };
  const onSaveChange = () => {
    topic.coverImage = filer.coverImagePath;
    dispatch(addTopic(topic));
  };

  return (
    <Container fluid className='mt-2'>
      <h4 className='text-center'>
        {topicSlug ? `topic title` : `Add topic or PAST IT HERE`}
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
                placeholder='Please type here...'
                onChange={onInputChange}
              />
            </Col>
            <Col xs={12} md={3} lg={3}>
              <FileUploader />
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <Button variant='outline-secondary' onClick={() => history.goBack()}>
            Cancel
          </Button>
          <Button
            variant='primary'
            onClick={onSaveChange}
            disabled={oneTopic.newTopicLoading}
          >
            {oneTopic.newTopicLoading ? 'Saving... Please wait' : 'Save topic'}
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
