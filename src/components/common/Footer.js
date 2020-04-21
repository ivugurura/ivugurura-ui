import React from 'react';
import { Container, Row, Col, Card, Form, Media } from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';

const currentYear = new Date().getFullYear();
export const Footer = () => {
  return (
    <footer>
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
              <Card.Body>
                <Card.Title>Ibyigisho biheruka</Card.Title>
                {[1, 2, 3].map((el) => (
                  <Media.Body key={el}>
                    <h6>{`Icyigisho cya ${el}`}</h6>
                    <p>April, 20</p>
                  </Media.Body>
                ))}
              </Card.Body>
            </Col>
          </Row>
        </Container>
      </Card>
      <Card style={bgStyles.bgPrimary} className='mt-2'>
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
