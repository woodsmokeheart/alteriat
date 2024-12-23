import React from "react";
import { IconEmojiObjects } from "assets/svg/IconEmojiObjects";
import css from "./HeaderFarm.module.css";
import { useCreateFarmStore } from "components/store/farmStore";
import { IconEqualizer } from "assets/svg/IconEqualizer";
import cn from "classnames";

export const HeaderFarm = () => {
  const { accountScore } = useCreateFarmStore();

  const formatScore = (score: number) => {
    if (score < 1000) {
      return score;
    } else if (score < 1000000) {
      return (score / 1000).toFixed(score % 1000 >= 100 ? 1 : 0) + "K";
    } else {
      return (
        (score / 1000000).toFixed(score % 1000000 >= 100000 ? 1 : 0) + "KK"
      );
    }
  };

  return (
    <div className={css.wrapper}>
      <div className={css.username}>
        <span>immortaldeveloper</span>
      </div>
      <div className={css.button_container}>
        <div className={css.containerScore}>
          <IconEmojiObjects width={16} height={16} />
          <div className={css.score}>{formatScore(accountScore)} INT</div>
        </div>
        <button className={cn(css.containerScore, css.tops)}>
          <IconEqualizer width={16} height={16} />
        </button>
      </div>
    </div>
  );
};
