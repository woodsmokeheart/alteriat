import React, { useEffect, useState } from "react";
import "./App.module.css";
import { Farm } from "./components/Farm/Farm";
import { ModalChoice } from "./components/Modals/ModalChoice/ModalChoice";
import { setUserGender } from "./components/store/userStore";

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
    <div className="App">
      <Farm />
      <ModalChoice
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleSelectGender}
      />
    </div>
  );
}

export default App;
