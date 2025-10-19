import React from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tab,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVFileUpload } from '../../../common/components/RRVFileUpload';

import { TopicImages } from './TabImages';

export const CoverImage = ({ open, handleClose }) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState('upload');
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dl-title"
      aria-describedby="dl-description"
    >
      <DialogTitle id="dl-title" sx={{ mt: 2 }}>
        {t('admin.topic.ciTitle')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="dl-description">
          {t('admin.topic.ciSubtitle')}
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
              <Tab value="upload" label={t('admin.topic.ciTabUpload')} />
              <Tab value="current" label={t('admin.topic.ciTabSelect')} />
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
        <Button onClick={handleClose}>{t('actions.btnCancel')}</Button>
        <Button onClick={handleClose} autoFocus>
          {t('actions.btnPreview')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
