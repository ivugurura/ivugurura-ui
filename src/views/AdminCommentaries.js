import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AdminPageHeader } from '../components/common';
import { Commentaries } from '../components';
import { useSelector } from 'react-redux';

export const AdminCommentaries = () => {
  const { comments, loading } = useSelector(
    ({ adminComments }) => adminComments
  );
  return (
    <>
      <AdminPageHeader name='Topics commentaries' />
      <section className='tables'>
        <Container fluid>
          <Row>
            <Col sm={12} md={10}>
              <Commentaries loading={loading} comments={comments} />
            </Col>
            <Col sm={12} md={2}>
              <h1 className='display-3'>{comments.length}</h1>
              <span>Commentaries</span>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default AdminCommentaries;
