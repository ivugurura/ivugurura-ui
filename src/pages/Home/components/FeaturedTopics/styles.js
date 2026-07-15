import { palette } from '../../../../common/theme/palette';

export const sharedStyles = {
  featuredCard: {
    display: 'block',
    position: 'relative',
    height: { xs: 280, md: '100%' },
    minHeight: { md: 460 },
    borderRadius: 3,
    overflow: 'hidden',
    textDecoration: 'none',
    '&:hover .featured-overlay': { opacity: 0.85 },
    '&:hover .featured-title': { textDecoration: 'underline' },
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  },
  featuredOverlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.1) 100%)',
    transition: 'opacity 0.3s',
  },
  featuredContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    p: 3,
  },
  featuredChip: {
    bgcolor: palette.white,
    color: palette.blackColor,
    fontWeight: 700,
    mb: 1.5,
    fontSize: 11,
  },
  featuredTitle: {
    color: palette.white,
    lineHeight: 1.3,
    mb: 1,
  },
  featuredSummary: {
    color: 'rgba(255,255,255,0.85)',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    mb: 1,
  },
  featuredDate: {
    color: 'rgba(255,255,255,0.7)',
  },
  smallCardLink: {
    display: 'flex',
    gap: 1.5,
    textDecoration: 'none',
    borderRadius: 2,
    p: 1,
    transition: 'background 0.2s',
    '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' },
    '&:hover .small-title': { textDecoration: 'underline' },
  },
  smallCardImage: {
    width: 90,
    height: 70,
    objectFit: 'cover',
    borderRadius: 2,
    flexShrink: 0,
  },
  smallCardTitle: {
    color: palette.blackColor,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: 1.4,
    mb: 0.5,
  },
  smallCardSummary: {
    color: palette.listGrey,
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    mt: 0.5,
    mb: 0.5,
  },
  smallCardDate: {
    color: palette.listGrey,
  },
  sideCard: {
    borderRadius: 2,
    overflow: 'hidden',
    height: '100%',
  },
  sideCardImage: {
    width: '100%',
    height: 130,
    objectFit: 'cover',
    display: 'block',
  },
  sideCardContent: {
    p: 1.5,
  },
  loadingGrid: {
    container: true,
    spacing: 2,
  },
};
