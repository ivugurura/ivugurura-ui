import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addAlbum, getAlbums } from '../../redux/actions';
import { toast } from 'react-toastify';

export const AddAlbum = ({ show, onHide }) => {
  const [albumName, setAlbumName] = useState('');
  const dispatch = useDispatch();
  const { albumAdding, albumAdded } = useSelector(({ album }) => album);
  useEffect(() => {
    if (albumAdded) {
      toast(`Album ${albumName.toUpperCase()} has added`);
      setAlbumName('');
      dispatch(getAlbums());
    }
  }, [albumAdded]);
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>Add a new album</Modal.Header>
      <Modal.Body>
        <Form.Control
          type='text'
          placeholder='Type name'
          onChange={(e) => setAlbumName(e.target.value)}
          value={albumName}
        />
      </Modal.Body>
      <Modal.Footer>
        <ButtonGroup>
          <Button variant='danger' onClick={onHide}>
            Cancel
          </Button>
          <Button
            disabled={albumAdding}
            onClick={() => dispatch(addAlbum({ name: albumName }))}
          >
            {albumAdding ? 'Saving...' : 'Save'}
          </Button>
        </ButtonGroup>
      </Modal.Footer>
    </Modal>
  );
};
