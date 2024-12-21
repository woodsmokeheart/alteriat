import React from "react";
import { IconEvents } from "assets/svg/IconEvents";
import { IconPersone } from "assets/svg/IconPersone";
import { IconGroups } from "assets/svg/IconGroups";
import { IconMilitaryTech } from "assets/svg/IconMilitaryTech";
import { IconEmojiObjects } from "assets/svg/IconEmojiObjects";
import css from "./HeaderFarm.module.css";

export const HeaderFarm = () => {
  return (
    <div className={css.wrapper}>
      {/* рейтинги */}
      <button className={css.button}>
        <IconEvents width={16} height={16} />
      </button>
      {/* ачивки */}
      <button className={css.button}>
        <IconMilitaryTech width={16} height={16} />
      </button>
      <div className={css.containerScore}>
        <IconEmojiObjects width={16} height={16} />
        <div className={css.score}>14 572 188 INT</div>
      </div>
      {/* реферы */}
      <button className={css.button}>
        <IconGroups width={16} height={16} />
      </button>
      {/* профиль */}
      <button className={css.button}>
        <IconPersone width={16} height={16} />
      </button>
    </div>
  );
};
