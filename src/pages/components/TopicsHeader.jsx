import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';

export const TopicsHeader = () => {
  console.log('Topics Header');
  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">
      MUI
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
    >
      Core
    </Link>,
    <Typography key="3" color="text.primary">
      Breadcrumb
    </Typography>,
  ];
  return (
    <Stack spacing={2}>
      <Breadcrumbs separator=">">{breadcrumbs}</Breadcrumbs>
    </Stack>
  );
};
