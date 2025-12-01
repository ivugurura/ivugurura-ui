import { Box, Card, CardContent, CardHeader, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVSunEditor } from '../../../common/components/RRVEditor/SunEditor';

export const TopicDetails = ({ topic, ...props }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader title={t('admin.topic.detail')} />
      <CardContent>
        <Paper component={Box} mt={3}>
          <RRVSunEditor
            value={topic?.content}
            placeholder={t('admin.topic.phDetail')}
            {...props}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
