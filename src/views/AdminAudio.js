import React, { useEffect, useState } from 'react';
import { AdminPageHeader, TableCard, Loading } from '../components/common';
import {
  Col,
  Row,
  Card,
  Container,
  Form,
  Button,
  FormGroup,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums, addNewMedia } from '../redux/actions';
import { AddAlbum } from '../components/models/AddAlbum';
import { FileUpload } from '../components/models';

export const AdminAudio = () => {
  const [show, setShow] = useState(false);
  const [newMedia, setNewMedia] = useState({
    title: '',
    albumId: '',
    type: '',
    mediaLink: '',
  });
  const dispatch = useDispatch();
  const { album, media, filer } = useSelector(({ album, media, filer }) => ({
    album,
    media,
    filer,
  }));
  const { albums, albumsFetching } = album;
  const { mediaAdding, mediaAdded } = media;
  const { coverImagePath } = filer;
  useEffect(() => {
    dispatch(getAlbums());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAlbums]);
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
  const onInputChange = ({ target }) => {
    setNewMedia({ ...newMedia, [target.name]: target.value });
  };
  return (
    <>
      <AddAlbum show={show} onHide={() => setShow(false)} />
      <AdminPageHeader
        name='Media/audio'
        btnTitle='Add new album'
        btnAction={() => setShow(true)}
      />
      <Row className='no-padding-top'>
        {albumsFetching ? (
          <Loading />
        ) : albums.length ? (
          albums.map((album, albumIndex) => (
            <Col sm={4} md={3} key={albumIndex}>
              <Card>
                <Card.Header>
                  <h4>{album.name}</h4>
                </Card.Header>
              </Card>
            </Col>
          ))
        ) : (
          <h4 className='text-center'>No albums</h4>
        )}
      </Row>
      <section className='tables no-padding-top'>
        <Container fluid>
          <Row>
            <Col sm={12} md={6}>
              <TableCard />
            </Col>
            <Col sm={12} md={6}>
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
                  {newMedia.type === 'audio' ? (
                    <FileUpload title='Select audio' />
                  ) : null}
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
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
