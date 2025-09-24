import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/ThemeProvider.tsx";
import { WindowsProvider } from "./contexts/WindowsProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <WindowsProvider>
        <App />
      </WindowsProvider>
    </ThemeProvider>
  </StrictMode>
);
