import React from "react";
import css from "./HeaderFarm.module.css";
import { IconEmojiObjects } from "assets/svg/IconEmojiObjects";

export const HeaderFarm = () => {
  return (
    <div className={css.wrapper}>
      <IconEmojiObjects width={16} height={16} />
      <div className={css.score}>14 572 188 INT</div>
    </div>
  );
};
