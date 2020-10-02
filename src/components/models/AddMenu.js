import React, { useEffect, useState } from 'react';
import { Modal, Form, ButtonGroup, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions';

const initials = { name: '', categoryId: '', hasParent: false };
export const AddMenu = ({ show, onHide }) => {
  const [newCategory, setNewCategory] = useState(initials);
  const {
    category: { navCategories },
    categoryAdd: { loading, done }
  } = useSelector(({ category, categoryAdd }) => ({ category, categoryAdd }));
  const onChangeInput = ({ target: { name, value, checked } }) => {
    const inputValue = name === 'hasParent' ? checked : value;
    setNewCategory({ ...newCategory, [name]: inputValue });
  };
  useEffect(() => {
    if (done) {
      setNewCategory(initials);
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>Create a new menu</Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            type='text'
            name='name'
            placeholder='Category name'
            value={newCategory.name}
            onChange={onChangeInput}
          />
          <Form.Check
            type='switch'
            id='hasParent'
            name='hasParent'
            value={newCategory.hasParent}
            onChange={onChangeInput}
            label='Does it have a parent'
          />
        </Form.Group>
        {newCategory.hasParent ? (
          <Form.Group controlId='parent'>
            <Form.Label>Parent category</Form.Label>
            <Form.Control
              as='select'
              name='categoryId'
              value={newCategory.categoryId}
              onChange={onChangeInput}
              custom
            >
              <option value={null}>------Select----</option>
              {navCategories.map(({ id, name }, navIdx) => (
                <option key={navIdx} value={id}>
                  {name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        ) : null}
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button variant='danger' onClick={onHide}>
            Cancel
          </Button>
          <Button disabled={loading} onClick={() => addCategory(newCategory)}>
            {loading ? 'Saving category,...' : 'Save'}
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};
