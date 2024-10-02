import React from "react";
import css from "./BottomBar.module.css"; // Подключим стили для кнопок

export const BottomBar = () => {
  return (
    <div className={css.bottom_bar}>
      <button className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/armored-helmet.png"
          alt="armored-helmet"
        />
        Profile
      </button>
      <button className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/mana.png"
          alt="mana"
        />
        Boosters
      </button>
      <button className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/medieval-barracks.png"
          alt="medieval-barracks"
        />
        English
      </button>
      <button className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/treasure-chest.png"
          alt="treasure-chest"
        />
        Earn
      </button>
      <button className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/joystick.png"
          alt="joystick"
        />
        Games
      </button>
    </div>
  );
};
