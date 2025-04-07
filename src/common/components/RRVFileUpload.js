import React from 'react';

import { Box, Button, Grid, LinearProgress, Typography } from '@mui/material';
import { MuiFileInput } from 'mui-file-input';
import AvatarEditor from 'react-avatar-editor';
import { useDispatch } from 'react-redux';

import { uploadFileWithProgress } from '../../helpers/utils';
import { notifier } from '../../helpers/utils/constants';
import { setFilePath } from '../../redux/actions';

const { Buffer } = require('buffer/');

const initialImageProps = {
  file: null,
  uploaded: '',
  isUploaded: false,
  height: 190,
  width: 460,
  bRadius: 5,
  zoom: 0.68,
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

export const RRVFileUpload = ({
  title = '',
  type = 'image',
  accept = '.png, .jpg, .jpeg',
  placeholder = 'Insert a file',
  imgProps = {},
  onFirstExcute = () => {},
}) => {
  const dispatch = useDispatch();
  const [imageProps, setImageProps] = React.useState({
    ...initialImageProps,
    ...imgProps,
  });
  const imageRef = React.createRef(null);
  const [progress, setProgress] = React.useState(0);

  const handleChange = React.useCallback(({ target }) => {
    setImageProps((prev) => ({
      ...prev,
      [target.name]: parseFloat(target.value),
      isUploaded: false,
    }));
  }, []);

  const handleUploadFile = () => {
    let fileToUpload = imageProps.file;
    const imgCurrent = imageRef.current;
    if (imgCurrent && imageProps.file?.type?.includes('image/')) {
      const imageDataUrl = imgCurrent.getImageScaledToCanvas().toDataURL();
      fileToUpload = dataUrlToFile(imageDataUrl, imageProps.file.name);
    }
    // console.log(fileToUpload);

    if (imageProps.file && fileToUpload) {
      uploadFileWithProgress(fileToUpload, imageProps.uploaded, type, (e) => {
        setProgress(Math.round((100 * e.loaded) / e.total));
      })
        .then((res) => {
          const theFileName = res.data.data;
          setProgress(0);
          dispatch(setFilePath(theFileName));
          setImageProps((prev) => ({
            ...prev,
            uploaded: theFileName,
            isUploaded: true,
          }));
        })
        .catch((error) => {
          console.log(error);

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
  const handleFileChange = (selectedFile) => {
    setImageProps((prev) => ({ ...prev, file: selectedFile }));
    onFirstExcute();
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <MuiFileInput
          label={title}
          value={imageProps.file}
          onChange={handleFileChange}
          placeholder={`${placeholder}(${accept.replaceAll('.', '')})`}
          inputProps={{ accept }}
        />
      </Grid>
      <Grid item xs={12} mt={1}>
        {imageProps.file?.type?.includes('image/') && (
          <div style={{ display: 'flex', gap: '10px' }}>
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
            <div>
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
            </div>
          </div>
        )}
        {!imageProps.isUploaded && imageProps.file && (
          <Button onClick={handleUploadFile}>
            Upload the file to the server
          </Button>
        )}
        {progress > 0 && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="h6">{`${progress}%`}</Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: '10' }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
};
