import React, { useEffect, useState } from 'react';

import { Grid, Card, CardHeader, CardContent } from '@mui/material';

import { RRVTable } from '../../../common/components/RRVTable';
import { actions, initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { NavConfigs } from './NavConfigs';
import { pubsColumns } from './schema';

const alertInitial = {
  current: null,
  message: '',
  open: false,
};
const Settings = () => {
  const [alertData, setAlertData] = useState(alertInitial);
  const { data, isFetching, refetch } = actions.useGetPubsConfigQuery();
  const [publish, publishRes] = actions.usePublishTopicMutation();

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
    <DashboardContainer title="Setting menu">
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
            <CardHeader title="Public communication" />
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
    </DashboardContainer>
  );
};

export default Settings;
