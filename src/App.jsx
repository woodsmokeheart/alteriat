import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { EarnPage } from "./Pages/EarnPage/EarnPage";
import { MarketPage } from "./Pages/MarketPage/MarketPage";
import { FarmPage } from "./Pages/FarmPage/FarmPage";
import { ProfilePage } from "./Pages/ProfilePage/ProfilePage";
import { WalletPage } from "./Pages/WalletPage/WalletPage";

import { TriangleSpinner } from "./components/Loaders/Triangle/TriangleSpinner";
import {
  setFirstName,
  setUsername,
  setLanguageCode,
  setUserID,
} from "./components/store/userStore";

import "./App.module.css";

function App() {
  const [isLoader, setIsLoader] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const tg = window.Telegram.WebApp; // Получаем объект webapp телеграма
    tg.expand(); // Расширяем на все окно
    setUser(tg.initDataUnsafe.user); // Сохраняем данные пользователя
    setFirstName(user.first_name);
    setUsername(user.username);
    setLanguageCode(user.language_code);
    setUserID(user.id);
  }, [user]);

  useEffect(() => {
    setIsLoader(true);
    setTimeout(() => {
      setIsLoader(false);
    }, 500);
  }, []);

  return (
    <Router>
      <div className="App">
        {isLoader ? (
          <TriangleSpinner />
        ) : (
          <Routes>
            <Route path="/earn" element={<EarnPage />} />
            <Route path="/market" element={<MarketPage />} />
            <Route path="/" element={<FarmPage />} />
            <Route path="/profile" element={<ProfilePage user={user} />} />
            <Route path="/wallet" element={<WalletPage />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
