import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';
import { Link } from 'react-router-dom';

const topicImg = `${process.env.PUBLIC_URL}/topic-cour-img.png`;
export const SampleTopics = ({ isHomePage }) => {
  return (
    <Card style={bgStyles.bgAccent}>
      {isHomePage ? (
        <Card.Header style={bgStyles.bgPrimary} className='text-center'>
          <h1 style={textStyles.textTransparent}>Radio Ijwi ry Ubugorozi</h1>
          <Card.Link style={textStyles.textTransparent}>
            Yumve nonaha hano
          </Card.Link>
        </Card.Header>
      ) : (
        <h1 className='text-center mt-2'>Related topics</h1>
      )}
      <Card.Body>
        <Row>
          {[1, 2, 3].map((item) => (
            <Col key={item} xs={12} md={4} lg={4}>
              <Link to={`/topic-title-${item}`}>
                <Card>
                  <Card.Img variant='top' src={topicImg} />
                  <Card.Body>
                    <Card.Title>Topic title</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content...
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  );
};
