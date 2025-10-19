import React, { useState } from 'react';

import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { Button, Box, IconButton, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVTable } from '../../../common/components/RRVTable';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { AddEditUser } from './AddEditUser';
import { userColumns } from './schema';

const alertInitial = {
  current: null,
  message: '',
  open: false,
  action: 'add',
};
export const SystemUsers = () => {
  const { t } = useTranslation();
  const [alertData, setAlertData] = useState(alertInitial);
  const [open, setOpen] = useState(false);
  const { data, isFetching, refetch } = actions.useListUsersSystemQuery();

  const handleSetAction = (action, user) => {
    const alert = { ...alertInitial, current: user, action };
    if (action === 'delete') {
      alert.message = `Are you sure you want to ${action} the user: 
      "${user.names}"?`;
      alert.open = true;
    }
    if (action === 'edit' || action === 'add') {
      setOpen(true);
    }
    setAlertData(alert);
  };

  const { data: users, totalItems } = data || initials.dataArr;
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
        onConfirmYes={() => {}}
        loading={false}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} lg={12}>
          <RRVTable
            columns={userColumns()}
            data={users}
            isLoading={isFetching}
            enableRowActions
            renderRowActions={({ row }) => (
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
        <Grid item xs={12} lg={2}>
          <h1>{totalItems}</h1>
          {t('admin.nav.systemUsers')}
        </Grid>
      </Grid>
    </DashboardContainer>
  );
};

export default SystemUsers;
