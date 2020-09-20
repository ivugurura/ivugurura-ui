import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, FormGroup, Button } from 'react-bootstrap';
import { addNewMedia } from '../redux/actions';
import { FileUpload } from './models';
import { useSelector, useDispatch } from 'react-redux';

export const AddEditMedia = () => {
  const dispatch = useDispatch();
  const [newMedia, setNewMedia] = useState({
    title: '',
    albumId: '',
    type: '',
    mediaLink: '',
  });
  const onInputChange = ({ target }) => {
    setNewMedia({ ...newMedia, [target.name]: target.value });
  };
  const { album, media, filer } = useSelector(({ album, media, filer }) => ({
    album,
    media,
    filer,
  }));
  const { albums } = album;
  const { mediaAdding, mediaAdded } = media;
  const { coverImagePath } = filer;
  useEffect(() => {
    if (mediaAdded) {
      setNewMedia({
        title: '',
        albumId: '',
        type: '',
        mediaLink: '',
      });
    }
    if (coverImagePath) {
      setNewMedia({ ...newMedia, mediaLink: coverImagePath });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaAdded, coverImagePath]);
  return (
    <Card>
      <Card.Header>Add media</Card.Header>
      <Card.Body>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Media title'
            name='title'
            value={newMedia.title}
            onChange={onInputChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <FormGroup>
              <Form.Control
                as='select'
                name='type'
                value={newMedia.type}
                onChange={onInputChange}
              >
                <option>--Select type--</option>
                <option value='audio'>Audio</option>
                <option value='video'>Video</option>
              </Form.Control>
            </FormGroup>
          </Col>
          <Col>
            <Form.Control
              as='select'
              name='albumId'
              value={newMedia.albumId}
              onChange={onInputChange}
            >
              <option>--Choose album--</option>
              {albums.map((album, albumIndex) => (
                <option key={albumIndex} value={album.id}>
                  {album.name}
                </option>
              ))}
            </Form.Control>
          </Col>
        </Row>
        {newMedia.type === 'audio' ? <FileUpload title='Select audio' /> : null}
        {newMedia.type === 'video' ? (
          <Form.Group>
            <Form.Control
              type='text'
              placeholder='Paste a Youtube link'
              name='mediaLink'
              value={newMedia.mediaLink}
              onChange={onInputChange}
            />
          </Form.Group>
        ) : null}

        <Button
          disabled={mediaAdding}
          onClick={() => dispatch(addNewMedia(newMedia))}
        >
          {mediaAdding ? 'Saving new media' : 'Save'}
        </Button>
      </Card.Body>
    </Card>
  );
};
