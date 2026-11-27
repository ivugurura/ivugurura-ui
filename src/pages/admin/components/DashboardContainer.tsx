import React from 'react';

import { Card, CardContent, CardHeader } from '@mui/material';

interface DashboardContainerProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export const DashboardContainer: React.FC<DashboardContainerProps> = ({
  title,
  action,
  children,
}) => (
  <Card>
    <CardHeader title={<h2>{title}</h2>} action={action} />
    <CardContent>{children}</CardContent>
  </Card>
);
