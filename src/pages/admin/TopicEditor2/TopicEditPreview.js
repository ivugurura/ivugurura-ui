import React from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton,
} from '@mui/material';

import TopicItem from '../../TopicItem';

export const TopicEditPreview = ({ topic = {}, open, onClose }) => (
  <Dialog
    onClose={onClose}
    aria-labelledby="topic-overview-title"
    open={open}
    maxWidth="md"
  >
    <DialogTitle sx={{ m: 0, p: 2 }} id="topic-overview-title">
      Preview:
      {' '}
      {topic.title}
    </DialogTitle>
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
    <DialogContent dividers>
      <TopicItem topic={topic} />
    </DialogContent>
    <DialogActions>
      <Button autoFocus onClick={onClose}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);