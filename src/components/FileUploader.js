import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile } from '../redux/actions';
import { truncate } from '../utils/constants';

export const FileUploader = ({ fileType }) => {
  const dispatch = useDispatch();
  const { uploadLoading, coverImagePath } = useSelector(({ filer }) => filer);
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
  return (
    <div className='custom-file mb-4'>
      <input
        type='file'
        className='custom-file-input'
        id='customFile'
        onChange={onChange}
      />
      <label className='custom-file-label' htmlFor='customFile'>
        {truncate(fileName, 18)}
      </label>
      <div className='text-center'>
        <img src={fileSrc} className='img-fluid img-thumbnail' alt='' />
      </div>
      <button
        className='btn btn-sm btn-round btn-primary'
        onClick={onUpload}
        disabled={fileName === '' ? true : false}
      >
        {uploadLoading
          ? 'Uploading...'
          : coverImagePath
          ? 'Has uploaded'
          : 'Upload'}
      </button>
    </div>
  );
};
