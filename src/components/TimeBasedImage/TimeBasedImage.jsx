import React, { useState, useEffect } from "react";

export const TimeBasedImage = () => {
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
        setCurrentImage("/images/morning.png");
        break;
      case "day":
        setCurrentImage("/images/day.png");
        break;
      case "evening":
        setCurrentImage("/images/evening.png");
        break;
      case "night":
        setCurrentImage("/images/night.png");
        break;
      default:
        setCurrentImage("/images/day.png"); // По умолчанию дневное изображение
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
    ></div>
  );
};
