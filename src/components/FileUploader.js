import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile, deleteFile } from '../redux/actions';
import { truncate } from '../utils/constants';
import { Form, Button, ButtonGroup } from 'react-bootstrap';

export const FileUploader = ({ coverImage }) => {
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    uploadLoading,
    coverImagePath,
    delLoading,
    deleteSuccess,
  } = useSelector(({ filer }) => filer);
  const [file, setFile] = useState('');
  const [fileSrc, setFileSrc] = useState('');
  const [fileName, setFileName] = useState('Select cover image');
  const onChange = ({ target }) => {
    setFile(target.files[0]);
    setFileName(target.files[0].name);
    setFileSrc(URL.createObjectURL(target.files[0]));
  };
  const onUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadFile(formData));
  };
  useEffect(() => {
    if (deleteSuccess) {
      setFileSrc('');
      setFile('');
      setFileName('Select cover image');
    }
  }, [uploadLoading, coverImagePath, delLoading, deleteSuccess, coverImage]);
  useEffect(() => {
    if (coverImage) {
      const imagePath = `${process.env.REACT_APP_API_URL}/images/${coverImage}`;
      setFileSrc(imagePath);
    }
  }, [coverImage]);

  return (
    <div className='custom-file mb-4'>
      {!coverImage ? (
        <Form.File
          id='customFile'
          label={truncate(fileName, 18)}
          onChange={onChange}
          custom
        />
      ) : null}
      <div className='text-center'>
        <img
          src={fileSrc}
          className='img-fluid img-thumbnail'
          alt='Cover image'
        />
      </div>
      {!coverImage ? (
        <ButtonGroup>
          {coverImagePath ? (
            <Button
              variant='outline-warning'
              onClick={() => dispatch(deleteFile('image', coverImagePath))}
            >
              {delLoading ? 'Deleting...' : 'Delete image'}
            </Button>
          ) : (
            <Button variant='outline-primary' onClick={onUpload}>
              {uploadLoading
                ? 'Uploading...'
                : coverImagePath
                ? 'Has uploaded'
                : 'Upload'}
            </Button>
          )}
        </ButtonGroup>
      ) : null}
    </div>
  );
};
