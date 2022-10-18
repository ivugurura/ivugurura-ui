import React, { Suspense } from 'react';

// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import "./i18n";
import { ThemeProvider as ThemeProviderV4, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline, LinearProgress } from '@mui/material';
import { ThemeProvider as ThemeProviderV5 } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ErrorBoundary } from './common/components/ErrorBoundary';
import { generateClassName, themeV4, themeV5 } from './common/theme';
import { AppRoutes } from './routes';
// import { Route } from "react-router";

const App = () => {
  if (window.location.pathname === '/') {
    window.location.href = '/kn';
    console.log('Root directory');
  }
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProviderV4 theme={themeV4}>
        <ThemeProviderV5 theme={themeV5}>
          <ErrorBoundary location={null}>
            <CssBaseline />
            <ToastContainer />
            <Suspense fallback={<LinearProgress />}>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </Suspense>
          </ErrorBoundary>
        </ThemeProviderV5>
      </ThemeProviderV4>
    </StylesProvider>
  );
};

export default App;
