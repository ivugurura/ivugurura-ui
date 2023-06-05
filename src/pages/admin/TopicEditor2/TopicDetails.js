import React from 'react';

import {
  Box, Card, CardContent, CardHeader, Paper,
} from '@mui/material';

import { RRVEditor } from '../../../common/components/RRVEditor';

export const TopicDetails = () => {
  console.log('Topic Details');
  return (
    <Card>
      <CardHeader title="Topic detail" />
      <CardContent>
        <Paper component={Box} mt={3}>
          <RRVEditor
            placeholder="Type topic details here"
          />
        </Paper>
      </CardContent>
    </Card>
  );
};
