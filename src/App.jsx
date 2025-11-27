import { useState } from "react";
import "./App.css";
import { SiteContextProvider } from "./context/SiteContext";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import InformationSite from "./pages/InformationSite.jsx";
function App() {
  return (
    <>
      <SiteContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/site/:id" element={<InformationSite />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </SiteContextProvider>
    </>
  );
}

export default App;
