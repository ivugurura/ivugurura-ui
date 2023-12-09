import React, { Suspense } from 'react';

// import "./i18n";
// import { ThemeProvider as ThemeProviderV4, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline, LinearProgress } from '@mui/material';
import { StyledEngineProvider, ThemeProvider as ThemeProviderV5 } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import {
  theme,
} from './common';
import { ErrorBoundary } from './common/components';
// import { buildAppStates } from './redux/stateBuilder';
import { store } from './redux/store';
// import { ErrorBoundary } from './common/components/errors';
// import { generateClassName, themeV4, themeV5 } from './common/theme';
import { AppRoutes } from './routes';
// import { Route } from "react-router";

const App = () => {
  // const states = buildAppStates();
  if (window.location.pathname === '/') {
    window.location.href = '/kn';
    console.log('Root directory');
  }
  // console.log('AppStates', states);
  return (
  // <StylesProvider generateClassName={generateClassName}>
  //   <ThemeProviderV4 theme={themeV4}>
    <ThemeProviderV5 theme={theme}>
      <Provider store={store}>
        <ErrorBoundary location={null}>
          <CssBaseline />
          <StyledEngineProvider>
            <ToastContainer />
            <Suspense fallback={<LinearProgress />}>
              <BrowserRouter>
                <AppRoutes />
              </BrowserRouter>
            </Suspense>
          </StyledEngineProvider>
        </ErrorBoundary>
      </Provider>
    </ThemeProviderV5>
  //   </ThemeProviderV4>
  // </StylesProvider>
  );
};

export default App;
