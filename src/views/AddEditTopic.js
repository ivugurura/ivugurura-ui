import React from 'react';
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

export const AddEditTopic = () => {
  return (
    <Container fluid className='mt-2'>
      <Card>
        <Card.Header closeButton>
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
              <ImageUploader
                withIcon={true}
                buttonText='Add cover image'
                onChange={() => console.log('Upload')}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
                withPreview={true}
                singleImage={true}
                name='cover-image'
              />
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
