import React from 'react';

import { Box, Card, CardContent, CardHeader, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { RRVSunEditor } from '../../../common/components/RRVEditor/SunEditor';

export const TopicDetails = ({ topic, sunEdContent, setSunEdContent }) => {
  const { t } = useTranslation();
  return (
    <Card>
      <CardHeader title={t('admin.topic.detail')} />
      <CardContent>
        <Paper component={Box} mt={3}>
          {/* <RRVEditor
            placeholder="Type topic details here"
            editorState={editorState}
            onEditorStateChange={setEditorState}
            toolbarCustomButtons={[<Button>Insert image</Button>]}
          /> */}
          <RRVSunEditor
            topic={topic}
            sunEdContent={sunEdContent}
            setSunEdContent={setSunEdContent}
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
