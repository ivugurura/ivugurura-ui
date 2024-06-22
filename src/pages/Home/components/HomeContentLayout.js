import React from 'react';

import { Card, CardContent } from '@mui/material';

export const HomeContentLayout = ({ children, cardContentProps = {} }) => (
  <Card color="red">
    {/* <CardHeader title="Audio and video" subheader="Recents" /> */}
    <CardContent {...cardContentProps}>{children}</CardContent>
  </Card>
);
