import { useEffect } from 'react';

import {
  DeleteOutlineOutlined,
  EditNoteOutlined,
  PublishOutlined,
} from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  RRVTable,
  renderRowActionMenus,
} from '../../../common/components/RRVTable';
import { useAlertDialog } from '../../../common/hooks/useAlertDialog';
import { useMuiSearchPagination } from '../../../common/hooks/useMuiSearchPagination';
import { dashboardActions } from '../../../helpers/topics';
import { notifier, toLink } from '../../../helpers/utils/constants';
import { actions } from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { DashboardCount } from './DashboardCount';
import { dashboardTopicsColumns } from './schema';

const dashboardMenus = (t) => [
  {
    title: t('actions.edit'),
    icon: EditNoteOutlined,
    action: 'edit',
  },
  {
    title: ({ isPublished }) => t(`actions.${isPublished ? 'un' : ''}publish`),
    icon: PublishOutlined,
    action: 'publish',
  },
  {
    title: ({ entities }) =>
      t(`actions.${entities?.length ? 'remove' : 'add'}Home`),
    icon: DeleteOutlineOutlined,
    canDisable: ({ isPublished }) => !isPublished,
    action: 'home',
  },
];

const HomeDashboard = ({ countFetch }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { alertValues, reset, setAlertValues } = useAlertDialog();
  const { paginator, ...tableProps } = useMuiSearchPagination();
  const { data: counts, ...restCountsQ } = countFetch;
  const { data: overviewData, ...overviewQ } = actions.useGetOverviewTopicQuery(
    { truncate: 200, ...paginator },
  );
  const [updateTopic, updateRes] = actions.useUpdateTopicMutation();
  const [setOrRemoveTopicDisplay, displayRes] =
    actions.useSetHomeTopicMutation();
  const { data: topics, totalItems } = overviewData || initials.dataArr();

  useEffect(() => {
    if (updateRes.isSuccess || displayRes.isSuccess) {
      reset();
      overviewQ.refetch();
      if (displayRes.isSuccess) {
        displayRes.reset();
      }
      if (updateRes.isSuccess) {
        updateRes.reset();
        restCountsQ.refetch();
      }
    }
  }, [updateRes.isSuccess, displayRes.isSuccess]);

  const handleMenuAction = (type, actionParams) => {
    actionParams.closeMenu();
    if (type === 'edit') {
      navigate(toLink(`edit-topic/${actionParams.row.original.slug}`, true));
      return;
    }
    const { action, title } = dashboardActions(type, actionParams.row.original);
    setAlertValues({
      current: actionParams.row.original,
      open: true,
      actionType: type,
      message: `Are you sure you want to ${action.toUpperCase()} 
      "${title.toUpperCase()}"?`,
    });
  };

  const handleConfirmAction = () => {
    const { current, actionType } = alertValues;
    if (actionType === 'publish') {
      updateTopic({
        slug: current.slug,
        isPublished: !current.isPublished,
      });
      return;
    }
    if (actionType === 'home') {
      if (!current?.isPublished) {
        notifier.error(t('admin.home.publishDisclaimer'));
        return;
      }
      setOrRemoveTopicDisplay({
        topicId: current.id,
        type: 'topic',
        displayType: 'home',
      });
    }
  };

  return (
    <DashboardContainer title={t('admin.home.subtitle')}>
      <AlertConfirm
        {...alertValues}
        setOpen={() => reset()}
        onConfirmYes={handleConfirmAction}
        loading={updateRes.isLoading || displayRes.isLoading}
      />
      <Grid container spacing={1}>
        {counts.map((dt) => (
          <Grid item key={dt.title} xs={12} sm={4} lg={2}>
            <DashboardCount
              title={dt.title}
              value={dt.counts}
              difference={dt.difference}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ marginTop: '1rem' }}>
        <RRVTable
          columns={dashboardTopicsColumns(t)}
          data={topics}
          isLoading={overviewQ.isFetching}
          enableRowActions
          renderRowActionMenuItems={renderRowActionMenus(
            handleMenuAction,
            dashboardMenus(t),
          )}
          {...tableProps}
          rowCount={totalItems || 0}
        />
      </Box>
    </DashboardContainer>
  );
};

export default HomeDashboard;
