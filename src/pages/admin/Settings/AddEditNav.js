import React, { useState } from 'react';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';

import { RRVForm } from '../../../common/components/RRVForm';

import { navSchema } from './schema';

const initialStates = {
  name: '',
  hasParent: false,
};
export const AddEditNav = ({ open, onClose, navs = [] }) => {
  const [newNav, setNewNav] = useState(initialStates);
  console.log('AddEditNav', newNav);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create a new nav menu</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Nav setting: set navigation menu as they get diplayed
          in the website as well as in the Mobile app.
        </DialogContentText>
        <RRVForm fields={navSchema(navs, newNav)} states={newNav} setStates={setNewNav} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={() => {}}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};
