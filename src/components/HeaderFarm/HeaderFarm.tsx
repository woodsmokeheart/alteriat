import cn from "classnames";
import { useCreateFarmStore } from "components/store/farmStore";
import { IconEmojiObjects } from "assets/svg/IconEmojiObjects";
import { IconEqualizer } from "assets/svg/IconEqualizer";
import { useCreateUserStore } from "components/store/userStore";
// import { createRatingModal } from "components/Modals/RatingModal/RatingModal";

import css from "./HeaderFarm.module.css";
import { RatingModal } from "components/Modals/RatingModal/RatingModal";
import { useState } from "react";

export const HeaderFarm = () => {
  const [ratingIsOpen, setRatingIsOpen] = useState(false);
  const ratingToggle = () => setRatingIsOpen((prev) => !prev);

  const { accountScore } = useCreateFarmStore();
  const { firstName } = useCreateUserStore();

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
        <span>{firstName}</span>
      </div>
      <div className={css.button_container}>
        <div className={css.containerScore}>
          <IconEmojiObjects width={16} height={16} />
          <div className={css.score}>{formatScore(accountScore)} INT</div>
        </div>
        <button
          className={cn(css.containerScore, css.tops)}
          onClick={ratingToggle}
        >
          <IconEqualizer width={16} height={16} />
        </button>
      </div>
      <RatingModal isOpen={ratingIsOpen} onResolve={ratingToggle} />
    </div>
  );
};
