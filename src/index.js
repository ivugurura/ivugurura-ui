import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import { App } from "./App";
import { ProgressBar } from "react-bootstrap";

ReactDOM.render(
  <Suspense fallback={<ProgressBar now />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
