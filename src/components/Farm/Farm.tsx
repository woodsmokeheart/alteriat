import React, { useState, useEffect } from "react";
import { BottomBar } from "../BottomBar/BottomBar";
import { FarmScale } from "../FarmScale/FarmScale";

import css from "./Farm.module.css";
import { useCreateUserStore } from "../store/userStore";

export const Farm = () => {
  const [currentImage, setCurrentImage] = useState("");

  // Получаем пол пользователя из хранилища
  const { userGender } = useCreateUserStore();

  useEffect(() => {
    // Логика для показа изображения в зависимости от пола
    if (userGender === "Male") {
      setCurrentImage("/images/char/Tark.png");
    } else if (userGender === "Female") {
      setCurrentImage("/images/char/Rose.png");
    } else {
      setCurrentImage("/images/backgrounds/spark_loader.gif"); // Дефолтное изображение
    }
  }, [userGender]); // Срабатывает при изменении userGender

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${currentImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={css.content}>
        <FarmScale />
      </div>
      <BottomBar />
    </div>
  );
};
