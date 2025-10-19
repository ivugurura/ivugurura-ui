import React, { useEffect, useState } from 'react';

import { Grid, Card, CardHeader, CardContent, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVTable } from '../../../common/components/RRVTable';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { AddEditPublic } from './AddEditPublic';
import { NavConfigs } from './NavConfigs';
import { pubsColumns } from './schema';
// import { SyncAudios } from './SyncAudio';

const alertInitial = {
  current: null,
  message: '',
  open: false,
};
const Settings = () => {
  const { t } = useTranslation();
  const [alertData, setAlertData] = useState(alertInitial);
  const [openAddPub, setOpenAddPub] = useState(false);
  const { data, isFetching, refetch } = actions.useGetPubsConfigQuery();
  const [publish, publishRes] = actions.usePublishPubConfigMutation();

  useEffect(() => {
    if (publishRes.isSuccess) {
      publishRes.reset();
      refetch();
      setAlertData(alertInitial);
    }
  }, [publishRes.isSuccess]);

  const handleSetAction = (pub) => {
    const action = pub.isPublished ? 'UNPUBLISH' : 'PUBLISH';
    setAlertData((prev) => ({
      ...prev,
      current: pub,
      message: `Are you sure you want to ${action} the communiquee: 
      "${pub.content}"?`,
      open: true,
    }));
  };

  const { data: pubs } = data || initials.dataArr;
  return (
    <DashboardContainer title={t('admin.webSettings.title')}>
      <AlertConfirm
        {...alertData}
        setOpen={() => setAlertData((prev) => ({ ...prev, ...alertInitial }))}
        title={alertData.title}
        onConfirmYes={() =>
          publish({
            pubId: alertData.current.id,
            isPublished: !alertData.current.isPublished,
          })
        }
        loading={publishRes.isLoading}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} lg={9}>
          <Card>
            <CardHeader
              title={t('admin.webSettings.subTitle')}
              action={
                <Button onClick={() => setOpenAddPub(true)}>
                  {t('admin.webSettings.addNewCom')}
                </Button>
              }
            />
            <CardContent>
              <RRVTable
                columns={pubsColumns(handleSetAction)}
                data={pubs}
                isLoading={isFetching}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={3}>
          <NavConfigs />
        </Grid>
      </Grid>
      <AddEditPublic
        open={openAddPub}
        onClose={() => setOpenAddPub(false)}
        refetchPubs={refetch}
      />
    </DashboardContainer>
  );
};

export default Settings;
