import type { TypographyVariantsOptions } from '@mui/material/styles';

import { palette } from './palette';

/** Same type scale as radio-ui. */
export const typography: TypographyVariantsOptions = {
  fontFamily: '"Roboto Slab", Georgia, "Times New Roman", serif',
  h1: { fontSize: '2.5rem', fontWeight: 600 },
  h2: { fontSize: '2rem', fontWeight: 600 },
  h3: { fontSize: '1.75rem', fontWeight: 500 },
  h4: { fontSize: '1.5rem', fontWeight: 500 },
  h5: { fontSize: '1.25rem', fontWeight: 500 },
  h6: { fontSize: '1rem', fontWeight: 500 },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 400,
    color: palette.text.secondary,
  },
  body1: { fontSize: '0.875rem' },
  body2: { fontSize: '0.75rem', color: palette.text.secondary },
};
