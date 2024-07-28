import React, { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
  const [createUser, res] = actions.useCreateUserSystemMutation();
  const [updateUser, editRes] = actions.useUpdateUserSystemMutation();

  useEffect(() => {
    if (current && action === 'edit') {
      setUser(toNewObj(userInitials, current));
    }
    if (action === 'add') {
      setUser(userInitials);
    }
  }, [current, action]);
  useEffect(() => {
    if (res.isSuccess || editRes.isSuccess) {
      setUser(userInitials);
      res.reset();
      refetchUsers();
      onClose();
    }
  }, [res.isSuccess, editRes.isSuccess]);

  const handleSave = () => {
    const saveUser = action === 'edit' ? updateUser : createUser;
    saveUser({ ...user, userId: current?.id });
  };
  const isEdit = action === 'edit';
  const lebels = isEdit ? userEditLebels : undefined;
  const isLoading = res.isLoading || editRes.isLoading;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isEdit ? `Edit user "${current?.names}"` : 'Create a new album'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          System Users: An user who can create or modifiy contents on the
          website. Can be an admin, editor
        </DialogContentText>
        <RRVForm
          fields={userSchema(lebels)}
          states={user}
          setStates={setUser}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isLoading} onClick={handleSave}>
          {isLoading ? 'Saving,...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
