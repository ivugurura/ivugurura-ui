/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

import './styles.css';
import { socialMedias, systemLanguage } from '../../../helpers/utils/constants';
import { Copyright } from '../Copyright';

export const navCategories = [
  {
    id: 13,
    name: 'Amagara mazima',
    slug: 'amagara-mazima-cqzkfgehpjo',
    languageId: 1,
    createdAt: '2020-09-24T05:53:36.660Z',
    updatedAt: '2020-09-24T05:53:36.660Z',
    categoryId: null,
    categories: [
      {
        id: 14,
        name: 'Ubuzima',
        slug: 'ubuzima-m75kfiqfemj',
      },
    ],
  },
  {
    id: 9,
    name: 'Ubuhanuzi',
    slug: 'ubuhanuzi-cqzkfgeg2wo',
    languageId: 1,
    createdAt: '2020-09-24T05:52:20.664Z',
    updatedAt: '2020-09-24T05:52:20.664Z',
    categoryId: null,
    categories: [
      {
        id: 10,
        name: "Ubuhanuzi bw'ahashize",
        slug: 'ubuhanuzi-bw-ahashize-cqzkfgegito',
      },
      {
        id: 12,
        name: "Ubuhanuzi bw'ahazaza",
        slug: 'ubuhanuzi-bw-ahazaza-cqzkfgehd9d',
      },
      {
        id: 11,
        name: "Ubuhanuzi bw'iki gihe",
        slug: 'ubuhanuzi-bw-iki-gihe-cqzkfgegy3j',
      },
    ],
  },
  {
    id: 6,
    name: 'Imibereho myiza',
    slug: 'imibereho-myiza-cqzkfgeejzv',
    languageId: 1,
    createdAt: '2020-09-24T05:51:09.499Z',
    updatedAt: '2020-09-24T05:51:09.499Z',
    categoryId: null,
    categories: [
      {
        id: 8,
        name: 'Umuryango',
        slug: 'umuryango-cqzkfgefdl7',
      },
      {
        id: 7,
        name: 'Uburezi',
        slug: 'uburezi-cqzkfgeeygd',
      },
    ],
  },
  {
    id: 1,
    name: 'Ubukristo',
    slug: 'ubukristo-cqzkfgec1lk',
    languageId: 1,
    createdAt: '2020-09-24T05:49:12.344Z',
    updatedAt: '2020-09-24T05:49:12.344Z',
    categoryId: null,
    categories: [
      {
        id: 5,
        name: "Itorero ry'Imana",
        slug: 'itorero-ry-imana-cqzkfgedunh',
      },
      {
        id: 3,
        name: 'Gutsindishirizwa',
        slug: 'gutsindishirizwa-cqzkfged033',
      },
      {
        id: 4,
        name: "Ukuri kw'iki gihe",
        slug: 'ukuri-kw-iki-gihe-cqzkfgedmo9',
      },
      {
        id: 2,
        name: 'Babuloni',
        slug: 'babuloni-cqzkfgecooy',
      },
    ],
  },
];
export const MainFooter = () => {
  // const { navCategories } = useSelector(({ category }) => category);
  console.log('Footer');
  return (
    <footer className="mainfooter" role="contentinfo">
      <div className="footer-middle">
        <Container>
          <Grid container>
            <Grid item lg={10} md={10} sm={12} xs={12}>
              <Grid container>
                {[].map((category) => (
                  <Grid item xs={12} sm={12} md={3} lg={3} key={category.slug}>
                    <div className="footer-pad">
                      <h4>{category.name}</h4>
                      <ul className="list-styled">
                        {category.categories.map((subCat) => (
                          <Link
                            key={subCat.slug}
                            to={`/${systemLanguage}/topics/categories/${subCat.slug}`}
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
              <h5>Follow us</h5>
              <ul className="social-network social-circle">
                {socialMedias.map((social) => (
                  <li key={social.name}>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href={social.url}
                      title={social.name}
                    >
                      <i className={`fa fa-${social.faIcon}`} />
                    </a>
                  </li>
                ))}
              </ul>
              <address>
                Contact Us:
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
