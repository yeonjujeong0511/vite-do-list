import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

async function init() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks");

    return worker.start();
  } else {
    axios.defaults.baseURL = "http://some.api.url";
  }
}

await init();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
