import React from 'react';

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import useRouter from 'utils/useRouter';

// const NODE_ENV = process.env.NODE_ENV;
// const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;

const Page = ({ title, children, ...rest }) => {
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
  console.log(title);
  return (
    <div {...rest}>
      <Helmet>
        <title>{`${title} - Ivugurura n ubugorozi`}</title>
      </Helmet>
      {children}
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default Page;
