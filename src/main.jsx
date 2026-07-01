import { createRoot } from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/context.jsx";
import { StrictMode } from "react";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <StrictMode>
  <ContextProvider>
    <App  />
  </ContextProvider>
  </StrictMode>
);