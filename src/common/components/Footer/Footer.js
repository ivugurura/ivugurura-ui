/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { Container, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import './styles.css';
import { socialMedias } from '../../../helpers/utils/constants';
import { Copyright } from '../Copyright';
import { useLang } from '../providers';

export const MainFooter = ({ navCategories = [] }) => {
  const { t } = useTranslation();
  const { lang } = useLang();
  return (
    <footer className="mainfooter" role="contentinfo">
      <div className="footer-middle">
        <Container>
          <Grid container>
            <Grid item lg={10} md={10} sm={12} xs={12}>
              <Grid container>
                {navCategories.map((category) => (
                  <Grid item xs={12} sm={12} md={3} lg={3} key={category.slug}>
                    <div className="footer-pad">
                      <h4>{category.name}</h4>
                      <ul className="list-styled">
                        {category.categories.map((subCat) => (
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
            <Grid item lg={2} md={2} sm={12} xs={12}>
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
              <address>
                {t('contactUs')}:
                <br />
                <a
                  href="mailto:abagorozi@yahoo.com"
                  rel="noreferrer"
                  target="_blank"
                >
                  abagorozi@yahoo.com
                </a>
              </address>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={12} className="copy">
              <Copyright />
            </Grid>
          </Grid>
        </Container>
      </div>
    </footer>
  );
};
