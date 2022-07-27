import React from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

const rootElement = document.getElementById("root");
createRoot(rootElement).render(<App />);
