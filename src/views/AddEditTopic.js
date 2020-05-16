import React, { useEffect } from 'react';
import SunEditor from 'suneditor-react';
import ImageUploader from 'react-images-upload';
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

export const AddEditTopic = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(({ category }) => category);
  useEffect(() => {
    dispatch(getCategories('/'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCategories]);
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
                <FormControl type='text' placeholder='Topic title' />
              </Col>
              <Col xs={12} md={3} lg={3}>
                <FormControl as='select'>
                  <option>Select category</option>
                  {loading ? (
                    <option>Loading</option>
                  ) : (
                    categories.map((category, categoryIndex) => (
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
                  height: 200,
                }}
                name='content'
                placeholder='Please type here...'
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
          <Button variant='primary'>Save Changes</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
};
