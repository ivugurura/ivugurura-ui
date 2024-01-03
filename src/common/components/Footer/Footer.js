/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './styles.css';
import { currentYear, socialMedias, systemLanguage } from '../../../helpers/utils/constants';

export const MainFooter = () => {
  // const { navCategories } = useSelector(({ category }) => category);
  console.log('Footer');
  const navCategories = [];
  return (
    <footer className="mainfooter" role="contentinfo">
      <div className="footer-middle">
        <Container>
          <Row>
            <Col lg={10} md={10} sm={12} xs={12}>
              <Row>
                {navCategories.map((category, categoryIdx) => (
                  <Col xs={12} sm={12} md={3} lg={3} key={categoryIdx}>
                    <div className="footer-pad">
                      <h4>{category.name}</h4>
                      <ul className="list-styled">
                        {category.categories.map((subCat, subCatIdx) => (
                          <Link
                            key={subCatIdx}
                            to={`/${systemLanguage}/topics/categories/${subCat.slug}`}
                          >
                            <p>{subCat.name}</p>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
              <h5>Follow us</h5>
              <ul className="social-network social-circle">
                {socialMedias.map((social, socialIdx) => (
                  <li key={socialIdx}>
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
            </Col>
          </Row>
          <Row>
            <Col md={12} className="copy">
              <p className="text-center">
                &copy; Copyright 2016-
                {currentYear}
                , Ivugurura n Ubugorozi. All rights reserved.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};
