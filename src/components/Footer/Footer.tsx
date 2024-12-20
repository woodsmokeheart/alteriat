import { IconPersone } from "assets/svg/IconPersone";
import { IconLocalFire } from "assets/svg/IconLocalFire";
import { IconFilterVintage } from "assets/svg/IconFilterVintage";
import { IconGamepad } from "assets/svg/IconGamepad";
import { IconShine } from "assets/svg/IconShine";
import { IconMonetization } from "assets/svg/IconMonetization";

import css from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={css.wrapper}>
      <button className={css.button}>
        <IconMonetization />
      </button>
      <button className={css.button}>
        <IconShine />
      </button>
      <button className={css.button}>
        <IconGamepad />
      </button>
      <button className={css.button}>
        <IconFilterVintage />
      </button>
      <button className={css.button}>
        <IconLocalFire />
      </button>
      <button className={css.button}>
        <IconPersone />
      </button>
    </div>
  );
};
