import React from 'react';

import { Card, CardContent, CardHeader } from '@mui/material';

export const DashboardContainer = ({ title, children }) => (
  <Card>
    <CardHeader title={<h2>{title}</h2>} />
    <CardContent sx={{ height: '100vh' }}>{children}</CardContent>
  </Card>
);
