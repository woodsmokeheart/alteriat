import React from "react";
import "./BottomBar.css"; // Подключим стили для кнопок

export const BottomBar = () => {
  return (
    <div className="bottom-bar">
      <button className="bottom-button">Profile</button>
      <button className="bottom-button">Boosters</button>
      <button className="bottom-button">Earn</button>
      <button className="bottom-button">Games</button>
    </div>
  );
};

