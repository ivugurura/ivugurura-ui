import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./i18n";
import { AuthProvider } from "common/components";

export const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Provider store={store}>
        <ToastContainer />
        <AuthProvider>
          <h2>AuthProvider</h2>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
};
