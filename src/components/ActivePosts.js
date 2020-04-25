import React from 'react';
import { Card, Media, Row, Col, Pagination } from 'react-bootstrap';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const ActivePosts = () => {
  return (
    <Card>
      <Card.Header>
        <Card.Title>ACTIVE POSTS</Card.Title>
      </Card.Header>
      <Card.Body>
        {[1, 2, 3].map((topic) => (
          <Media key={topic}>
            <img
              width={64}
              height={100}
              className='img-thumbnail'
              src={topicImg}
              alt='Generic placeholder'
            />
            <Media.Body>
              <b>{`Media Heading ${topic}`}</b>
              <p>
                Donec sed odio dui. Nullam quis risus eget urna mollis ornare
                vel eu leo. Cum sociis natoque penatibus
              </p>
              <hr />
            </Media.Body>
          </Media>
        ))}
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col xs={12}>
            <Pagination size='sm'>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};
