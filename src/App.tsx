import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { FarmPage } from "./components/Pages/FarmPage/FarmPage";
import { ModalChoice } from "./components/Modals/ModalChoice/ModalChoice";
import { setUserGender } from "./components/store/userStore";

import { EarnPage } from "components/Pages/EarnPage/EarnPage";
import { SkinsPage } from "components/Pages/SkinsPage/SkinsPage";
import { ProfilePage } from "components/Pages/ProfilePage/ProfilePage";
import { BoostersPage } from "components/Pages/BoostersPage/BoostersPage";
import { GamesPage } from "components/Pages/GamesPage/GamesPage";

import "./App.module.css";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [gender, setGender] = useState<string | null>(null);

  console.log(gender, "gender");

  useEffect(() => {
    // Проверяем, был ли пользователь ранее (например, с помощью localStorage)
    const userGender = localStorage.getItem("userGender");
    if (!userGender) {
      setModalOpen(true);
    } else {
      setGender(userGender);
      setUserGender(userGender); // записываем выбранный гендер в стор при новой проверке (пока нет бэкенда)
    }
  }, []);

  const handleSelectGender = (selectedGender: string) => {
    setGender(selectedGender);
    setUserGender(selectedGender); // записываем выбранный гендер в стор
    localStorage.setItem("userGender", selectedGender); // Сохраняем выбор пользователя
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<FarmPage />} />
          <Route path="/earn" element={<EarnPage />} />
          <Route path="/skins" element={<SkinsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/boosters" element={<BoostersPage />} />
          <Route path="/games" element={<GamesPage />} />
        </Routes>
        <ModalChoice
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelect={handleSelectGender}
        />
      </div>
    </Router>
  );
}

export default App;
