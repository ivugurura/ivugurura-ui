/* eslint-disable no-unused-vars */
import React from 'react';

import {
  Box, Button, Grid, LinearProgress, Typography,
} from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch } from 'react-redux';

import { uploadFileWithProgress } from '../../helpers/utils';
import { notifier } from '../../helpers/utils/constants';
import { setFilePath } from '../../redux/actions';

const { Buffer } = require('buffer/');

const initialImageProps = {
  file: null, uploaded: '', height: 190, width: 460, bRadius: 5, zoom: 0.68,
};
const dataUrlToFile = (dataUrl, filename) => {
  const arr = dataUrl.split(',');
  if (arr.length < 2) {
    return undefined;
  }
  const mimeArr = arr[0].match(/:(.*?);/);
  if (!mimeArr || mimeArr.length < 2) {
    return undefined;
  }
  const mime = mimeArr[1];
  const buff = Buffer.from(arr[1], 'base64');
  return new File([buff], filename.replace(' ', '_'), { type: mime });
};

export const RRVFileUpload = ({ title = '', type = 'image' }) => {
  const dispatch = useDispatch();
  const [imageProps, setImageProps] = React.useState(initialImageProps);
  const imageRef = React.createRef(null);
  const [progress, setProgress] = React.useState(0);

  const handleChange = React.useCallback(({ target }) => {
    setImageProps((prev) => ({
      ...prev,
      [target.name]: parseFloat(target.value),
    }));
  }, []);

  const handleUploadFile = () => {
    const imageDataUrl = imageRef.current?.getImageScaledToCanvas().toDataURL();
    let fileToUpload = imageProps.file;
    if (imageProps.file?.type?.includes('image/')) {
      fileToUpload = dataUrlToFile(imageDataUrl, imageProps.file.name);
    }
    if (imageProps.file && fileToUpload) {
      const convertedFile = dataUrlToFile(imageDataUrl, imageProps.file.name);
      uploadFileWithProgress(convertedFile, imageProps.uploaded, type, (e) => {
        setProgress(Math.round((100 * e.loaded) / e.total));
      })
        .then((res) => {
          const theFileName = res.data.data;
          setProgress(0);
          dispatch(setFilePath(theFileName));
          setImageProps((prev) => ({ ...prev, uploaded: theFileName }));
        })
        .catch((error) => {
          setProgress(0);
          let errorMessage = '';
          if (error.response) {
            const { error: message } = error.response.data;
            errorMessage = message;
          } else {
            errorMessage = error.message;
          }
          notifier.error(errorMessage);
        });
    }
  };
  return (
    <div className="files color">
      {/* <Form.File id="audioFile" label={title} onChange={onChange} /> */}
      <MuiFileInput
        label={title}
        value={imageProps.file}
        onChange={(selectedFile) => setImageProps((prev) => ({ ...prev, file: selectedFile }))}
        placeholder="Insert a file"
      />
      {imageProps.file?.type?.includes('image/') && (
        <div>
          <br />
          <AvatarEditor
            ref={imageRef}
            width={imageProps.width}
            height={imageProps.height}
            scale={imageProps.zoom}
            rotate={0}
            borderRadius={imageProps.height / (100 / imageProps.bRadius)}
            image={imageProps.file}
            className="cover"
          />
          <Grid container justifyContent="center">
            <Grid item>
              <div>
                Zoom:
                <input
                  name="zoom"
                  type="range"
                  min="0.01"
                  max="2"
                  step="0.01"
                  value={imageProps.zoom}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                Border radius:
                <input
                  name="bRadius"
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={imageProps.bRadius}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                Image height:
                <input
                  name="height"
                  type="number"
                  min="50"
                  max="250"
                  step="10"
                  onWheel={(event) => {
                    event.preventDefault();
                  }}
                  value={imageProps.height}
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                Image width:
                <input
                  name="width"
                  type="number"
                  min="50"
                  max="550"
                  step="10"
                  onWheel={(event) => {
                    event.preventDefault();
                  }}
                  value={imageProps.width}
                  onChange={handleChange}
                />
              </div>
            </Grid>
            <Grid item>
              <Button onClick={handleUploadFile}>Upload the file to the server</Button>
            </Grid>
          </Grid>
        </div>
      )}
      {progress > 0 && (
        <Box sx={{ width: '100%' }}>
          <Typography variant="h6">{`${progress}%`}</Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ height: '10' }} />
        </Box>
      )}
    </div>
  );
};
