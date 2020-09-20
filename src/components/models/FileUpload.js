import React from 'react';
import '../../styles/fileUpload.css';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { uploadFile } from '../../redux/actions';

export const FileUpload = ({ title, previousFile }) => {
  const dispatch = useDispatch();
  const onChange = ({ target }) => {
    const formData = new FormData();
    formData.append('file', target.files[0]);
    formData.append('previousFile', previousFile);

    dispatch(uploadFile(formData, 'song'));
  };
  return (
    <Form.Group className='files color'>
      <Form.File id='audioFile' label={title} onChange={onChange} />
    </Form.Group>
  );
};
