import React, { useState } from "react";
import Modal from "../Modal";
import css from "./ModalChoice.module.css";

interface ModalChoiceProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onSelect: (gender: string) => void;
}

export const ModalChoice: React.FC<ModalChoiceProps> = ({
  isOpen,
  onClose,
  onSelect,
}) => {
  const [isContentClosing, setIsContentClosing] = useState(false); // Управляет анимацией контента
  const [isOverlayClosing, setIsOverlayClosing] = useState(false); // Управляет анимацией оверлея

  const handleGenderSelect = (gender: string) => {
    setIsContentClosing(true); // Запуск анимации закрытия контента
    setTimeout(() => {
      setIsOverlayClosing(true); // Через 500 мс запускаем закрытие оверлея
      setTimeout(() => {
        onSelect(gender); // Передаем выбор пола
        onClose(); // Закрытие модалки после анимации
      }, 800); // Задержка для закрытия оверлея (время закрытия оверлея)
    }, 500); // Задержка для анимации закрытия контента
  };

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={300}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("/images/backgrounds/main.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 99999,
          opacity: isOverlayClosing ? 0 : 1, // Анимация исчезновения оверлея
          transition: "opacity 0.8s ease", // Плавная анимация исчезновения оверлея
        },
        content: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          width: 250,
          height: "max-content",
          boxShadow:
            "0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)",
          overflow: "hidden",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        },
      }}
    >
      <div
        className={`${css.wrapper} ${isContentClosing ? css.closeContent : ""}`}
      >
        <h2>Specify your gender</h2>
        <div className={css.button_container}>
          <button
            onClick={() => handleGenderSelect("Male")}
            className={css.button_gender}
          >
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/arcade/64/user-male.png"
              alt="user-male"
            />
            Male
          </button>
          <button
            onClick={() => handleGenderSelect("Female")}
            className={css.button_gender}
          >
            <img
              width="64"
              height="64"
              src="https://img.icons8.com/arcade/64/user-female.png"
              alt="user-female"
            />
            Female
          </button>
        </div>
      </div>
    </Modal>
  );
};
