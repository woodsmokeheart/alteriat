import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { FarmPage } from "Pages/FarmPage/FarmPage";
import { EarnPage } from "Pages/EarnPage/EarnPage";
import { SkinsPage } from "Pages/SkinsPage/SkinsPage";
import { ProfilePage } from "Pages/ProfilePage/ProfilePage";

import { BoostersPage } from "Pages/BoostersPage/BoostersPage";
import { GamesPage } from "Pages/GamesPage/GamesPage";

import "./App.module.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/earn" element={<EarnPage />} />
          <Route path="/skins" element={<SkinsPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/" element={<FarmPage />} />
          <Route path="/boosters" element={<BoostersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
