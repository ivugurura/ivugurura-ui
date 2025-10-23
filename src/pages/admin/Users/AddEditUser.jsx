import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
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
        {isEdit ? `Edit user "${current?.names}"` : t('admin.users.fTitle')}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{t('admin.users.fSubtitle')}</DialogContentText>
        <RRVForm
          fields={userSchema(lebels, t)}
          states={user}
          setStates={setUser}
        />
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onClose}>
          {t('actions.btnCancel')}
        </Button>
        <Button disabled={isLoading} onClick={handleSave}>
          {t(`actions.${isLoading ? 'loading' : 'btnSave'}`)}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
