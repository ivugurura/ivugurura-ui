import React, { Suspense } from "react";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import "./i18n";
import { AuthProvider } from "common/components";
import { CssBaseline, LinearProgress, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import theme from "common/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<LinearProgress />}>
        {/* <Provider> */}
        <ToastContainer />
        <AuthProvider>
          <h2>AuthProvider</h2>
        </AuthProvider>
        {/* </Provider> */}
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
