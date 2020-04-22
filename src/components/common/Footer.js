import React from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';
import { RecentTopics } from './RecentTopics';

const currentYear = new Date().getFullYear();
export const Footer = ({ isHomepage }) => {
  return (
    <footer>
      {isHomepage ? (
        <Card style={bgStyles.bgPrimary}>
          <Container style={textStyles.textTransparent} className='mt-4'>
            <Row>
              <Col xs={12} md={4} lg={4}>
                <Card.Body>
                  <Card.Title>Inyandiko</Card.Title>
                  <Form.Control size='lg' as='select'>
                    {[1, 2, 3].map((topic) => (
                      <option key={topic}>{`Icyigisho cya ${topic}`}</option>
                    ))}
                  </Form.Control>
                  {[1, 2, 3].map((item) => (
                    <Card.Text key={item}>{`Icyigisho cya ${item}`}</Card.Text>
                  ))}
                </Card.Body>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <Card.Body>
                  <Card.Title>Twandikire</Card.Title>
                  {['Amazina', 'Email', 'Message'].map((contact) => (
                    <Form.Control
                      key={contact}
                      className='mb-2'
                      type='text'
                      placeholder={contact}
                    />
                  ))}
                </Card.Body>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <RecentTopics />
              </Col>
            </Row>
          </Container>
        </Card>
      ) : null}

      <Card style={bgStyles.bgPrimary} className='mt-2 fixed-bottom'>
        <Container fluid style={textStyles.textTransparent}>
          <Row>
            <Col xs={12} md={4} lg={4}>
              {`@Copyright 2016-${currentYear}, Reformation Voice. All right reserved`}
            </Col>
            <Col xs={12} md={4} lg={4}>
              Tel:+250 788 476 743
            </Col>
            <Col xs={12} md={4} lg={4}>
              Kinyarwanda | English | French
            </Col>
          </Row>
        </Container>
      </Card>
    </footer>
  );
};
