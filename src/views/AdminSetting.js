import React, { useState, useEffect } from 'react';
import { AdminPageHeader } from '../components/common';
import { Row, Container, Col } from 'react-bootstrap';
import { Announcement } from '../components/models';
import { AdminCommuniques } from '../components';
import { useSelector } from 'react-redux';

export const AdminSetting = () => {
  const [show, setShow] = useState(false);
  const { communiqueAdded } = useSelector(({ communiqueAdd }) => communiqueAdd);
  useEffect(() => {
    if (communiqueAdded) {
      setShow(false);
    }
  }, [communiqueAdded]);
  return (
    <>
      <Announcement show={show} onHide={() => setShow(false)} />
      <AdminPageHeader
        name='Site setting'
        btnTitle='Add a new communication'
        btnAction={() => setShow(true)}
      />
      <section className='tables'>
        <Container fluid>
          <Row>
            <Col sm={12} md={8}>
              <AdminCommuniques />
            </Col>
            <Col sm={12} md={4}></Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
