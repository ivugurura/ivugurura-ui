import React, { useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import { bgStyles, textStyles } from '../../utils/styles';
import { RecentTopics } from './RecentTopics';
import { translate } from '../utils';
import { useSelector } from 'react-redux';
import { ContactForm } from '../ContactForm';
import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();
export const Footer = ({ isHomepage }) => {
  const [subCategories, setSubCategories] = useState([]);
  const { navCategories } = useSelector(({ category }) => category);
  return (
    <footer>
      {isHomepage ? (
        <Card style={bgStyles.bgPrimary}>
          <Container style={textStyles.textTransparent} className='mt-4'>
            <Row>
              <Col xs={12} md={4} lg={4}>
                <Card.Body>
                  <Card.Title style={textStyles.textFtTitle}>
                    {translate('writingsCat')}
                  </Card.Title>
                  <Form.Control
                    size='lg'
                    as='select'
                    name='category'
                    onChange={({ target }) =>
                      setSubCategories(navCategories[target.value].categories)
                    }
                  >
                    <option value=''>--------</option>
                    {navCategories.map((category, categoryIndex) => (
                      <option key={categoryIndex} value={categoryIndex}>
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                  {subCategories.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={`/topics/categories/${item.slug}`}
                    >
                      <Card.Text>
                        <h4>{item.name}</h4>
                      </Card.Text>
                    </Link>
                  ))}
                </Card.Body>
              </Col>
              <Col xs={12} md={4} lg={4}>
                <ContactForm />
              </Col>
              <Col xs={12} md={4} lg={4}>
                <RecentTopics />
              </Col>
            </Row>
          </Container>
        </Card>
      ) : null}

      <Card style={bgStyles.bgPrimary} className='mt-2'>
        <Container fluid style={textStyles.textTransparent}>
          <Row>
            <Col xs={12} md={4} lg={4}>
              {`@Copyright 2016-${currentYear}, `}
              <span>{translate('title')}</span>
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
