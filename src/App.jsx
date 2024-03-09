import React from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
import { FeatureFlagsProvider } from "./contexts/FeatureFlagsContext";
function App() {
  return (
    <>
      <FeatureFlagsProvider>
        <AuthContextProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthContextProvider>
      </FeatureFlagsProvider>
    </>
  );
}

export default App;
