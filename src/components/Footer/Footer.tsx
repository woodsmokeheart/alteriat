import { IconLocalFire } from "assets/svg/IconLocalFire";
import { IconFilterVintage } from "assets/svg/IconFilterVintage";
import { IconMonetization } from "assets/svg/IconMonetization";
import { IconShine } from "assets/svg/IconShine";
import { IconGamepad } from "assets/svg/IconGamepad";

import css from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={css.wrapper}>
      {/* задания */}
      <button className={css.button}>
        <IconMonetization />
      </button>
      {/* бустеры */}
      <button className={css.button}>
        <IconLocalFire />
      </button>
      {/* главная - фарм */}
      <button className={css.button}>
        <IconFilterVintage />
      </button>
      {/* мини-игры */}
      <button className={css.button}>
        <IconGamepad />
      </button>
      {/* маркет */}
      <button className={css.button}>
        <IconShine />
      </button>
    </div>
  );
};
