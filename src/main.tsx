import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./custom.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./redux/api";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApiProvider api={api}>
    <App />
  </ApiProvider>
);
