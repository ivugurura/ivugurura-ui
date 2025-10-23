import { Box } from '@mui/material';

export const HomeContentLayout = ({ children, cardContentProps = {} }) => (
  <Box>
    {/* <CardHeader title="Audio and video" subheader="Recents" /> */}
    <Box {...cardContentProps}>{children}</Box>
  </Box>
);
