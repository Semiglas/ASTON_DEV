import React from "react";
import { AppRoutes } from "./routes/AppRoutes";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";
function App() {
  return (
    <>
      <AuthContextProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthContextProvider>
    </>
  );
}

export default App;
