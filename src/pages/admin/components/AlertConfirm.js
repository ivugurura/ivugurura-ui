import React from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export const AlertConfirm = ({
  open,
  setOpen,
  onConfirmYes,
  message = '',
  loading = false,
  title = 'Confirm action',
}) => (
  <Dialog aria-labelledby="dialog-title" onClose={setOpen} open={open}>
    <DialogTitle id="dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button color="primary" onClick={setOpen}>
        Cancel
      </Button>
      <Button color="primary" disabled={loading} onClick={onConfirmYes}>
        {loading ? 'Loading,...' : 'Yes'}
      </Button>
    </DialogActions>
  </Dialog>
);
