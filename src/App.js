import React, { Suspense } from "react";
// import { Provider } from "react-redux";
// import { store } from "./redux/store";
// import "./i18n";
import { CssBaseline, LinearProgress, ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import theme from "common/theme";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "routes";
// import { Route } from "react-router";

const App = () => {
  if (window.location.pathname === "/") {
    window.location.href = "/kn";
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <Suspense fallback={<LinearProgress />}>
        <BrowserRouter basename="kn">
          <AppRoutes />
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
