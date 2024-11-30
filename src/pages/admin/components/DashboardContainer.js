import React from 'react';

import { Card, CardContent, CardHeader } from '@mui/material';

export const DashboardContainer = ({ title, action, children }) => (
  <Card>
    <CardHeader title={<h2>{title}</h2>} action={action} />
    <CardContent>{children}</CardContent>
  </Card>
);
