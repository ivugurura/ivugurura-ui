import { useState } from 'react';

import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Button, Grid, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVTable } from '../../../common/components/RRVTable';
import { actions, type QueryHook } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { AddEditUser } from './AddEditUser';
import { userColumns } from './schema';

interface SystemUser extends APP.IUser {
  names?: string;
}

type UserAction = 'add' | 'edit' | 'delete';

interface AlertData {
  current?: SystemUser | null;
  message: string;
  open: boolean;
  action: UserAction;
  title?: string;
}

const alertInitial: AlertData = {
  current: null,
  message: '',
  open: false,
  action: 'add',
};
export const SystemUsers = () => {
  const { t } = useTranslation();
  const [alertData, setAlertData] = useState<AlertData>(alertInitial);
  const [open, setOpen] = useState(false);
  const useListUsers = actions.useListUsersSystemQuery as unknown as QueryHook<
    SystemUser[],
    void
  >;
  const { data, isFetching, refetch } = useListUsers();

  const handleSetAction = (action: UserAction, user?: SystemUser) => {
    const alert: AlertData = {
      ...alertInitial,
      current: user,
      action,
    };
    if (action === 'delete') {
      alert.message = `Are you sure you want to ${action} the user:
      "${user?.names}"?`;
      alert.open = true;
    }
    if (action === 'edit' || action === 'add') {
      setOpen(true);
    }
    setAlertData(alert);
  };

  const { data: users, totalItems } = data || initials.dataArr<SystemUser>();
  return (
    <DashboardContainer
      title={t('admin.users.title')}
      action={
        <Button onClick={() => handleSetAction('add')}>
          {' '}
          {t('admin.users.addNewUser')}
        </Button>
      }
    >
      <AddEditUser
        open={open}
        onClose={() => setOpen(false)}
        refetchUsers={refetch}
        current={alertData.current}
        action={alertData.action}
      />
      <AlertConfirm
        {...alertData}
        setOpen={() => setAlertData((prev) => ({ ...prev, ...alertInitial }))}
        title={alertData.title}
        onConfirmYes={() => {
          /* no-op */
        }}
        loading={false}
      />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, lg: 12 }}>
          <RRVTable
            columns={userColumns(t)}
            data={users}
            isLoading={isFetching}
            enableRowActions
            renderRowActions={({ row }: { row: { original: SystemUser } }) => (
              <Box sx={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
                <IconButton
                  color="secondary"
                  onClick={() => handleSetAction('edit', row.original)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="error"
                  onClick={() => handleSetAction('delete', row.original)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 2 }}>
          <h1>{totalItems}</h1>
          {t('admin.nav.systemUsers')}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default SystemUsers;
