import React, { useState } from 'react';
import { AdminPageHeader } from '../components/common';
import { Row, Container, Col } from 'react-bootstrap';
import { Announcement } from '../components/models';
import { AdminCommuniques } from '../components';

export const AdminSetting = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Announcement show={show} onHide={() => setShow(false)} />
      <AdminPageHeader
        name='Site setting'
        btnTitle='Add a new communication'
        btnAction={() => setShow(true)}
      />
      <section className='tables no-padding-top'>
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
