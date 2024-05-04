import React, { Suspense } from 'react';

// import { ThemeProvider as ThemeProviderV4, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline, LinearProgress } from '@mui/material';
import {
  StyledEngineProvider,
  ThemeProvider as ThemeProviderV5,
} from '@mui/material/styles';
import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { theme } from './common';
import { ErrorBoundary, LangProvider } from './common/components';
// import { buildAppStates } from './redux/stateBuilder';
import { systemLanguage } from './helpers/utils/constants';
import { store } from './redux/store';
// import { ErrorBoundary } from './common/components/errors';
// import { generateClassName, themeV4, themeV5 } from './common/theme';
import { AppRoutes } from './routes';
// import { Route } from "react-router";
import './i18n';

const App = () => {
  // const states = buildAppStates();
  const path = window.location.pathname;
  const slPath = `/${systemLanguage}`;
  if (path === '/' || !path.startsWith(slPath)) {
    window.location.href = slPath;
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
              <LangProvider>
                <AppRoutes />
              </LangProvider>
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
