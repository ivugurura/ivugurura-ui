import { useEffect, useState } from 'react';

import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVTable } from '../../../common/components/RRVTable';
import {
  actions,
  type MutationHook,
  type QueryHook,
} from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { AddEditPublic } from './AddEditPublic';
import { NavConfigs } from './NavConfigs';
import { pubsColumns } from './schema';
// import { SyncAudios } from './SyncAudio';

interface PubConfig extends APP.IPub {
  id: string;
  isPublished: boolean;
}

interface AlertData {
  current: PubConfig | null;
  message: string;
  open: boolean;
  title?: string;
}

const alertInitial: AlertData = {
  current: null,
  message: '',
  open: false,
};
const Settings = () => {
  const { t } = useTranslation();
  const [alertData, setAlertData] = useState<AlertData>(alertInitial);
  const [openAddPub, setOpenAddPub] = useState(false);
  const useGetPubs = actions.useGetPubsConfigQuery as unknown as QueryHook<
    PubConfig[],
    void
  >;
  const usePublishPub = actions.usePublishPubConfigMutation as unknown as MutationHook<
    unknown,
    { pubId: string; isPublished: boolean }
  >;
  const { data, isFetching, refetch } = useGetPubs();
  const [publish, publishRes] = usePublishPub();

  useEffect(() => {
    if (publishRes.isSuccess) {
      publishRes.reset();
      refetch();
      setAlertData(alertInitial);
    }
  }, [publishRes.isSuccess]);

  const handleSetAction = (pub: PubConfig) => {
    const action = pub.isPublished ? 'UNPUBLISH' : 'PUBLISH';
    setAlertData((prev) => ({
      ...prev,
      current: pub,
      message: `Are you sure you want to ${action} the communiquee:
      "${pub.content}"?`,
      open: true,
    }));
  };

  const { data: pubs } = data || initials.dataArr<PubConfig>();
  return (
    <DashboardContainer title={t('admin.webSettings.title')}>
      <AlertConfirm
        {...alertData}
        setOpen={() => setAlertData((prev) => ({ ...prev, ...alertInitial }))}
        title={alertData.title}
        onConfirmYes={() =>
          publish({
            pubId: alertData.current!.id,
            isPublished: !alertData.current!.isPublished,
          })
        }
        loading={publishRes.isLoading}
      />
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, lg: 9 }}>
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
                columns={pubsColumns(handleSetAction, t)}
                data={pubs}
                isLoading={isFetching}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 3 }}>
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
