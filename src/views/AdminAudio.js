import React, { useEffect, useState } from 'react';
import { AdminPageHeader, TableCard, Loading } from '../components/common';
import { Col, Row, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../redux/actions';
import { AddAlbum } from '../components/models/AddAlbum';
import { AddEditMedia, Page } from '../components';

export const AdminAudio = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { albums, albumsFetching } = useSelector(({ album }) => album);
  useEffect(() => {
    dispatch(getAlbums());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAlbums]);
  return (
    <Page title='Audio setting'>
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
              <AddEditMedia />
            </Col>
          </Row>
        </Container>
      </section>
    </Page>
  );
};
