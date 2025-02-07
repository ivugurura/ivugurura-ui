import { palette } from './palette';

export const typography = {
  h1: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '36px',
    letterSpacing: '-0.24px',
    lineHeight: '40px',
    '@media (max-width: 768px)': {
      fontSize: '28px',
      lineHeight: '34px',
    },
    '@media (max-width: 480px)': {
      fontSize: '20px',
      lineHeight: '30px',
    },
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '26px',
    letterSpacing: '-0.24px',
    '@media (max-width: 768px)': {
      fontSize: '20px',
    },
    '@media (max-width: 480px)': {
      fontSize: '16px',
    },
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '24px',
    letterSpacing: '-0.06px',
    lineHeight: '28px',
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '20px',
    letterSpacing: '-0.06px',
    lineHeight: '24px',
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '20px',
  },
  subtitle1: {
    color: palette.darkGreen,
    fontSize: '18px',
    letterSpacing: '-0.05px',
    lineHeight: 1.2,
    '@media (max-width: 768px)': {
      fontSize: '16px',
    },
    '@media (max-width: 480px)': {
      fontSize: '14px',
    },
  },
  subtitle2: {
    color: palette.darkBlue,
    fontWeight: 400,
    fontSize: '16px',
    letterSpacing: '-0.05px',
    lineHeight: '21px',
    '@media (max-width: 768px)': {
      fontSize: '14px',
    },
    '@media (max-width: 480px)': {
      fontSize: '12px',
    },
  },
  body1: {
    color: palette.text.primary,
    fontSize: '14px',
    letterSpacing: '-0.05px',
    lineHeight: '21px',
  },
  body2: {
    color: palette.text.secondary,
    fontSize: '12px',
    letterSpacing: '-0.04px',
    lineHeight: '18px',
  },
  button: {
    color: palette.text.primary,
    fontSize: '14px',
  },
  caption: {
    color: palette.text.secondary,
    fontSize: '11px',
    letterSpacing: '0.33px',
    lineHeight: '13px',
  },
  overline: {
    color: palette.text.secondary,
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.33px',
    lineHeight: '13px',
    textTransform: 'uppercase',
  },
};
