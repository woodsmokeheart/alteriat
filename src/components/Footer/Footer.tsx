import { IconMonetization } from "assets/svg/IconMonetization";
import { IconShine } from "assets/svg/IconShine";

import css from "./Footer.module.css";
import { IconAccountBalanceWallet } from "assets/svg/IconAccountBalanceWallet";
import { IconPersone } from "assets/svg/IconPersone";
import { IconFingerprint } from "assets/svg/IconFingerprint";

export const Footer = () => {
  return (
    <div className={css.wrapper}>
      {/* заработок (три таба - ежедневный вход, общие задания и игры) */}
      <button className={css.button}>
        <IconMonetization />
      </button>
      {/* магазин скинов  и бустов (два таба) */}
      <button className={css.button}>
        <IconShine />
      </button>
      {/* майнинг */}
      <button className={css.button}>
        <IconFingerprint />
      </button>
      {/* профиль (рефераллы , ачивки, рейтинг) */}
      <button className={css.button}>
        <IconPersone />
      </button>
      {/* кошелек */}
      <button className={css.button}>
        <IconAccountBalanceWallet />
      </button>
    </div>
  );
};
