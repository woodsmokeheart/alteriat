import { Link } from "react-router-dom";

import css from "./BottomBar.module.css";

export const BottomBar = () => {
  return (
    <div className={css.bottom_bar}>
      <Link to="/earn" className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/treasure-chest.png"
          alt="treasure-chest"
        />
        Earn
      </Link>
      <Link to="/skins" className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/armored-breastplate.png"
          alt="armored-breastplate"
        />
        Skins
      </Link>
      <Link to="/profile" className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/armored-helmet.png"
          alt="armored-helmet"
        />
        Profile
      </Link>
      <Link to="/boosters" className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/mana.png"
          alt="mana"
        />
        Boosters
      </Link>
      <Link to="/games" className={css.bottom_button}>
        <img
          width="34"
          height="34"
          src="https://img.icons8.com/arcade/64/joystick.png"
          alt="joystick"
        />
        Games
      </Link>
    </div>
  );
};
