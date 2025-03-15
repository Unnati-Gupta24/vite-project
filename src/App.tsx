import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CampaignProvider } from "./context/CampaignContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Recipient from "./pages/Recipient";
import Donations from "./pages/Donations";
import CampaignDetails from "./pages/CampaignDetails";

function App() {
  return (
    <CampaignProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="recipient" element={<Recipient />} />
            <Route path="donations" element={<Donations />} />
            <Route path="opportunity/:id" element={<CampaignDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CampaignProvider>
  );
}

export default App;