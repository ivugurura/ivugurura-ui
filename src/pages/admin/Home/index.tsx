import { useEffect } from 'react';

import {
  DeleteOutlineOutlined,
  EditNoteOutlined,
  PublishOutlined,
} from '@mui/icons-material';
import { Box, Grid } from '@mui/material';
import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  RRVTable,
  renderRowActionMenus,
  type RowActionParams as RRVRowActionParams,
} from '../../../common/components/RRVTable';
import { useAlertDialog } from '../../../common/hooks/useAlertDialog';
import { useMuiSearchPagination } from '../../../common/hooks/useMuiSearchPagination';
import { dashboardActions } from '../../../helpers/topics';
import { notifier, toLink } from '../../../helpers/utils/constants';
import {
  actions,
  type MutationHook,
  type QueryHook,
} from '../../../redux/actions';
import { initials } from '../../../redux/apiSliceBuilder';
import { AlertConfirm } from '../components/AlertConfirm';
import { DashboardContainer } from '../components/DashboardContainer';

import { DashboardCount } from './DashboardCount';
import { dashboardTopicsColumns } from './schema';

interface DashboardTopic extends APP.ITopic {
  isPublished: boolean;
}

interface CountItem {
  title: string;
  counts: number;
  difference?: number;
}

interface CountFetch {
  data: CountItem[];
  refetch: () => void;
}

interface HomeDashboardProps {
  countFetch: CountFetch;
}

type RowActionParams = RRVRowActionParams<DashboardTopic>;

const dashboardMenus = (t: TFunction) => [
  {
    title: t('actions.edit'),
    icon: EditNoteOutlined,
    action: 'edit',
  },
  {
    title: ({ isPublished }: DashboardTopic) =>
      t(`actions.${isPublished ? 'un' : ''}publish`),
    icon: PublishOutlined,
    action: 'publish',
  },
  {
    title: ({ entities }: DashboardTopic) =>
      t(`actions.${entities?.length ? 'remove' : 'add'}Home`),
    icon: DeleteOutlineOutlined,
    canDisable: ({ isPublished }: DashboardTopic) => !isPublished,
    action: 'home',
  },
];

const HomeDashboard = ({ countFetch }: HomeDashboardProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { alertValues, reset, setAlertValues } = useAlertDialog();
  const { paginator, ...tableProps } = useMuiSearchPagination();
  const { data: counts, ...restCountsQ } = countFetch;
  const useGetOverview = actions.useGetOverviewTopicQuery as unknown as QueryHook<
    DashboardTopic[],
    typeof paginator & { truncate: number }
  >;
  const { data: overviewData, ...overviewQ } = useGetOverview({
    truncate: 200,
    ...paginator,
  });
  const useUpdateTopic = actions.useUpdateTopicMutation as unknown as MutationHook<
    unknown,
    { slug: string; isPublished: boolean }
  >;
  const useSetHomeTopic = actions.useSetHomeTopicMutation as unknown as MutationHook<
    unknown,
    { topicId: string; type: string; displayType: string }
  >;
  const [updateTopic, updateRes] = useUpdateTopic();
  const [setOrRemoveTopicDisplay, displayRes] = useSetHomeTopic();
  const { data: topics, totalItems } =
    overviewData || initials.dataArr<DashboardTopic>();

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

  const handleMenuAction = (type: string, actionParams: RowActionParams) => {
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
    const { actionType } = alertValues;
    const current = alertValues.current as unknown as DashboardTopic;
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
          <Grid key={dt.title} size={{ xs: 12, sm: 4, lg: 2 }}>
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
