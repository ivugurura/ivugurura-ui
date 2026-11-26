import { Link as MuiLink, Typography, type TypographyProps } from '@mui/material';
import { Link } from 'react-router-dom';

import { currentYear } from '../../helpers/utils/constants';

export const Copyright = (props: TypographyProps) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    &copy;
    {` Copyright 2016-${currentYear}, Ivugurura n Ubugorozi. All rights reserved.`}
    <MuiLink
      component={Link}
      to="/privacy-policy"
      color="inherit"
      underline="hover"
      sx={{ display: 'block', mt: 0.5 }}
    >
      Privacy Policy
    </MuiLink>
  </Typography>
);
