import React, { useState, useEffect } from "react";
import { BottomBar } from "../BottomBar/BottomBar";
import { FarmScale } from "../FarmScale/FarmScale";

import css from "./Farm.module.css";

export const Farm = () => {
  const [currentImage, setCurrentImage] = useState("");

  // Функция для определения текущего времени суток
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "day";
    if (hour >= 18 && hour < 21) return "evening";
    return "night";
  };

  useEffect(() => {
    const timeOfDay = getTimeOfDay();
    switch (timeOfDay) {
      case "morning":
        setCurrentImage("/images/char/Drago.png");
        break;
      case "day":
        setCurrentImage("/images/char/Tark.png");
        break;
      case "evening":
        setCurrentImage("/images/char/Rose.png");
        break;
      case "night":
        setCurrentImage("/images/char/Den.png");
        break;
      default:
        setCurrentImage("/images/char/Drago.png"); // По умолчанию дневное изображение
    }
  }, []);

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
