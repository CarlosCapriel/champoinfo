import { useState } from "react";
import "./App.css";
import { SiteContextProvider } from "./context/SiteContext";
import { Routes, Route } from "react-router";

import Home from "./pages/Home.jsx";
import InformationSite from "./pages/InformationSite.jsx";
function App() {
  return (
    <>
      <SiteContextProvider>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/site" element={<InformationSite />} />
        </Routes>
      </SiteContextProvider>
    </>
  );
}

export default App;
