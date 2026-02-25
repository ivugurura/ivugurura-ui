import React from 'react';

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
// import useRouter from 'utils/useRouter';

// const NODE_ENV = process.env.NODE_ENV;
// const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

interface PageHelmetProps {
  title?: string;
  description?: string;
  keywords?: string;
  children?: React.ReactNode;
}

const PageHelmet: React.FC<PageHelmetProps> = ({
  title,
  description,
  keywords,
  children,
  ...rest
}) => {
  const { t } = useTranslation();
  const isProduction = import.meta.env.REACT_APP_ENV === 'production';
  //   const router = useRouter();

  //   useEffect(() => {
  //     if (NODE_ENV !== 'production') {
  //       return;
  //     }

  //     if (window.gtag) {
  //       window.gtag('config', GA_MEASUREMENT_ID, {
  //         page_path: router.location.pathname,
  //         page_name: title
  //       });
  //     }
  //   }, [title, router]);
  return (
    <div {...rest}>
      {isProduction ? (
        <Helmet>
          <title>{title ? `${title} - ${t('logo')}` : t('logo')}</title>
          <meta
            name="description"
            content={description || `${t('subtitle')} - ${t('title')}`}
          />
          <meta name="keywords" content={keywords || t('keywords')} />
          <meta name="author" content={t('title')} />
        </Helmet>
      ) : null}
      {children}
    </div>
  );
};

PageHelmet.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageHelmet;
