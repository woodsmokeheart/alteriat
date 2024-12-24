import { IconMonetization } from "assets/svg/IconMonetization";
import { IconShine } from "assets/svg/IconShine";
import { IconAccountBalanceWallet } from "assets/svg/IconAccountBalanceWallet";
import { IconPersone } from "assets/svg/IconPersone";
import { IconFingerprint } from "assets/svg/IconFingerprint";

import css from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={css.wrapper}>
      {/* заработок (три таба - ежедневный вход?, общие задания и игры) */}
      <a href={"/earn"} className={css.button}>
        <IconMonetization />
      </a>
      {/* магазин скинов  и бустов (два таба) */}
      <a href={"/market"} className={css.button}>
        <IconShine />
      </a>
      {/* майнинг */}
      <a href={"/"} className={css.button}>
        <IconFingerprint />
      </a>
      {/* профиль (рефераллы , ачивки, рейтинг) */}
      <a href={"/profile"} className={css.button}>
        <IconPersone />
      </a>
      {/* кошелек */}
      <a href={"/wallet"} className={css.button}>
        <IconAccountBalanceWallet />
      </a>
    </div>
  );
};
