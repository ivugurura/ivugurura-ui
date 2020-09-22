import React, { useEffect, useState } from 'react';
import { Accordion, Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getCategories } from '../redux/actions';
import { currentLang } from '../utils/constants';
import { AddMenu } from './models';

export const MenuSetting = () => {
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const {
    category: { navCategories },
    categoryAdd: { done }
  } = useSelector(({ category, categoryAdd }) => ({ category, categoryAdd }));
  useEffect(() => {
    getCategories('/navs');
  }, [done]);
  return (
    <Card>
      <AddMenu show={openAddMenu} onHide={() => setOpenAddMenu(false)} />
      <Card.Header>
        <Card.Title>Setting menu=&gt;{currentLang.lang}</Card.Title>
        <Button
          variant='primary'
          size='sm'
          onClick={() => setOpenAddMenu(true)}
        >
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
