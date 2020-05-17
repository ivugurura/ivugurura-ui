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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../redux/actions';
import { FileUploader } from '../components';
import { addTopic } from '../redux/actions/topics';

export const AddEditTopic = () => {
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
  });
  useEffect(() => {
    dispatch(getCategories('/'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategories, addTopic]);
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
  console.log('server error', oneTopic.newTopicMesg);

  return (
    <Container fluid className='mt-2'>
      <Card>
        <Card.Header>
          <Card.Title>
            <Row>
              <Col xs={12} md={6} lg={6}>
                <h4>Write the content below or PASTE THEM</h4>
              </Col>
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
          <Link to='/admin' className='btn btn-default'>
            Cancel
          </Link>
          <Button variant='primary' onClick={onSaveChange}>
            Save Changes
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
