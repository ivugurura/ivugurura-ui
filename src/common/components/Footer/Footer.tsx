import { Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { socialMedias } from '../../../helpers/utils/constants';
import { Copyright } from '../Copyright';
import { useLang } from '../providers';
import './styles.css';

interface MainFooterProps {
  navCategories?: APP.ICategory[];
}

export const MainFooter = ({ navCategories = [] }: MainFooterProps) => {
  const { t } = useTranslation();
  const { lang } = useLang();
  return (
    <footer className="mainfooter" role="contentinfo">
      <div className="footer-middle">
        <Container>
          <Grid container>
            <Grid size={{ xs: 12, md: 10 }}>
              <Grid container>
                {navCategories.map((category) => (
                  <Grid size={{ xs: 12, md: 3 }} key={category.slug}>
                    <div className="footer-pad">
                      <h4>{category.name}</h4>
                      <ul className="list-styled">
                        {category.categories?.map((subCat) => (
                          <Link
                            key={subCat.slug}
                            to={`/${lang}/topics?t=${subCat.slug}`}
                          >
                            <p>{subCat.name}</p>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid size={{ xs: 12, md: 2 }}>
              <h5>{t('followUs')}</h5>
              <ul className="social-network social-circle">
                {socialMedias.map(({ name, url, icon: Icon }) => (
                  <li key={name}>
                    <a target="_blank" rel="noreferrer" href={url} title={name}>
                      <Icon />
                    </a>
                  </li>
                ))}
              </ul>
              <p>
                {t('contactUs')}:
                <br />
                <a
                  href="mailto:abagorozi@yahoo.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  abagorozi@yahoo.com
                </a>
              </p>
            </Grid>
          </Grid>
          <Grid container>
            <Grid size={{ md: 12 }} className="copy">
              <Copyright />
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  );
};
