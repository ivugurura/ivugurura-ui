import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile } from '../redux/actions';
import { truncate } from '../utils/constants';
import { Form } from 'react-bootstrap';
import { Loading } from './common/Loading';

export const FileUploader = ({ coverImage }) => {
  const dispatch = useDispatch();
  const { uploadLoading, coverImagePath } = useSelector(({ filer }) => filer);
  const [fileSrc, setFileSrc] = useState('');
  const [fileName, setFileName] = useState('Select cover image');

  const onChange = ({ target }) => {
    setFileName(target.files[0].name);
    setFileSrc(URL.createObjectURL(target.files[0]));

    const formData = new FormData();
    formData.append('file', target.files[0]);

    dispatch(uploadFile(formData, 'image', coverImagePath || coverImage));
  };
  useEffect(() => {
    if (coverImage) {
      const imagePath = `${process.env.REACT_APP_API_URL}/images/${coverImage}`;
      setFileSrc(imagePath);
    }
  }, [coverImage]);

  return (
    <div className='custom-file mb-4'>
      <Form.File
        id='customFile'
        label={truncate(fileName, 18)}
        onChange={onChange}
        custom
      />
      {fileSrc ? (
        <div className='text-center'>
          <img
            src={fileSrc}
            className='img-fluid img-thumbnail'
            alt='Topic cover'
          />
        </div>
      ) : null}
      {uploadLoading ? <Loading message='Uploading' /> : null}
      {/* <Button variant='outline-primary' onClick={onUpload}>
        {uploadLoading
          ? 'Uploading...'
          : coverImagePath
          ? 'Has uploaded'
          : 'Upload'}
      </Button> */}
    </div>
  );
};
