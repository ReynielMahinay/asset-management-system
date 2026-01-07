import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Notificaiton from "./components/common/Notificaiton.jsx";
import { AuthProvider } from "./context/AuthProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Notificaiton>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Notificaiton>
  </StrictMode>
);
