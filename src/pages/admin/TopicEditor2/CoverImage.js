import React from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Tab,
} from '@mui/material';

import { RRVFileUpload } from '../../../common/components/RRVFileUpload';

import { TopicImages } from './TabImages';

export const CoverImage = ({ open, handleClose }) => {
  const [value, setValue] = React.useState('upload');
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dl-title"
      aria-describedby="dl-description"
    >
      <DialogTitle id="dl-title" sx={{ mt: 2 }}>
        Select or upload a cover image for a topic
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dl-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList
              value={value}
              onChange={(_, newValue) => setValue(newValue)}
              textColor="secondary"
              indicatorColor="secondary"
              aria-label="secondary tabs example"
            >
              <Tab value="upload" label="Upload from your computer" />
              <Tab value="current" label="Choose from the uploaded images" />
            </TabList>
          </Box>
          <TabPanel value="upload">
            <RRVFileUpload />
          </TabPanel>
          <TabPanel value="current">
            <TopicImages />
          </TabPanel>
        </TabContext>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
