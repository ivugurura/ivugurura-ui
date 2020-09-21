import React, { useEffect } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCategories } from '../redux/actions';
import { currentLang } from '../utils/constants';

export const MenuSetting = ({ props }) => {
  const { navCategories } = useSelector(({ category }) => category);
  useEffect(() => {
    getCategories('/navs');
  }, []);
  return (
    <Card>
      <Card.Header>
        <Card.Title>Setting menu=&gt;{currentLang.lang}</Card.Title>
        <Button variant='primary' size='sm'>
          Add
        </Button>
      </Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey='0'>
          {navCategories.map(({ categories, name }, navIdx) =>
            categories.length ? (
              <Card key={navIdx}>
                <Accordion.Toggle as={Card.Header} eventKey={navIdx}>
                  {name}
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={navIdx}>
                  <>
                    {categories.map(({ name }, subNavIdx) => (
                      <Card.Body key={subNavIdx}>{name}</Card.Body>
                    ))}
                  </>
                </Accordion.Collapse>
              </Card>
            ) : (
              <Card.Body>{name}</Card.Body>
            )
          )}
        </Accordion>
      </Card.Body>
    </Card>
  );
};
