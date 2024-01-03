import React from 'react';

import { Card, CardContent } from '@mui/material';

export const HomeContentLayout = ({ children }) => (
  <Card color="red">
    {/* <CardHeader title="Audio and video" subheader="Recents" /> */}
    <CardContent>{children}</CardContent>
  </Card>
);
