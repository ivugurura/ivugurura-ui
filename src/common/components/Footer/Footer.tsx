import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link as MuiLink,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { socialMedias } from '../../../helpers/utils/constants';
import { Copyright } from '../Copyright';
import { useLang } from '../providers';

const CONTACT_EMAIL = 'abagorozi@yahoo.com';

/** Muted white for secondary footer text. */
const muted = 'rgba(255, 255, 255, 0.72)';

const footerLinkSx = {
  color: muted,
  '&:hover': { color: 'common.white' },
} as const;

interface MainFooterProps {
  navCategories?: APP.ICategory[];
}

export const MainFooter = ({ navCategories = [] }: MainFooterProps) => {
  const { t } = useTranslation();
  const { lang } = useLang();

  return (
    <Box
      component="footer"
      role="contentinfo"
      sx={({ palette }) => ({
        color: 'common.white',
        background: `linear-gradient(59deg, ${palette.navyLight}, ${palette.navy})`,
      })}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: 3 }}>
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {navCategories.map((category) => (
            <Grid key={category.slug} size={{ xs: 12, sm: 6, md: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                sx={{ color: 'inherit', mb: 1.5 }}
              >
                {category.name}
              </Typography>
              <Stack component="ul" spacing={1} sx={{ m: 0, p: 0 }}>
                {category.categories?.map((subCat) => (
                  <Box component="li" key={subCat.slug} sx={{ listStyle: 'none' }}>
                    <MuiLink
                      component={Link}
                      to={`/${lang}/topics?t=${subCat.slug}`}
                      underline="hover"
                      variant="body1"
                      sx={footerLinkSx}
                    >
                      {subCat.name}
                    </MuiLink>
                  </Box>
                ))}
              </Stack>
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 6, md: 3 }} sx={{ ml: { md: 'auto' } }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ color: 'inherit', mb: 1 }}
            >
              {t('followUs')}
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ ml: -1, mb: 2 }}>
              {socialMedias.map(({ name, url, icon: Icon }) => (
                <IconButton
                  key={name}
                  component="a"
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  title={name}
                  sx={{
                    color: muted,
                    '&:hover': {
                      color: 'common.white',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                  }}
                >
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
            <Typography variant="body1" sx={{ color: muted }}>
              {t('contactUs')}
            </Typography>
            <MuiLink
              href={`mailto:${CONTACT_EMAIL}`}
              underline="hover"
              variant="body1"
              sx={{ color: 'common.white' }}
            >
              {CONTACT_EMAIL}
            </MuiLink>
          </Grid>
        </Grid>

        <Divider
          sx={{ borderColor: 'rgba(255, 255, 255, 0.16)', mt: 4, mb: 2 }}
        />
        <Copyright sx={{ color: muted }} />
      </Container>
    </Box>
  );
};
