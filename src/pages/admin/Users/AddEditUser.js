import React, { useEffect, useState } from 'react';

import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@mui/material';

import { RRVForm } from '../../../common/components/RRVForm';
import { toNewObj } from '../../../helpers/utils';
import { actions } from '../../../redux/apiSliceBuilder';

import { userEditLebels, userInitials, userSchema } from './schema';

export const AddEditUser = ({
  open,
  onClose,
  refetchUsers,
  current = null,
  action = 'add',
}) => {
  const [user, setUser] = useState(userInitials);
  const [createUser, userRes] = actions.useCreateUserSystemMutation();

  useEffect(() => {
    if (current && action === 'edit') {
      setUser(toNewObj(userInitials, current));
    }
    if (action === 'add') {
      setUser(userInitials);
    }
  }, [current, action]);
  useEffect(() => {
    if (userRes.isSuccess) {
      setUser(userInitials);
      userRes.reset();
      refetchUsers();
      onClose();
    }
  }, [userRes.isSuccess]);
  const lebels = action === 'edit' ? userEditLebels : undefined;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{action === 'add' ? 'Create a new album' : `Edit user "${current?.names}"`}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          System Users: An user who can create or modifiy contents on the website.
          Can be an admin, editor
        </DialogContentText>
        <RRVForm fields={userSchema(lebels)} states={user} setStates={setUser} />
      </DialogContent>
      <DialogActions>
        <Button disabled={userRes.isLoading} onClick={onClose}>Cancel</Button>
        <Button
          disabled={userRes.isLoading}
          onClick={() => createUser(user)}
        >
          {userRes.isLoading ? 'Saving,...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
