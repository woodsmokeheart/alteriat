import { FC } from "react";
import { myRating, ratingList } from "mocks/ratingList";
import cn from "classnames";
import css from "./RatingContent.module.css";

interface RatingContentProps {}

export const RatingContent: FC<RatingContentProps> = () => {
  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <div className={css.header_title}>Rating</div>
      </div>

      <div className={css.rating_list}>
        {ratingList.map((r) => (
          <div
            key={r.id}
            className={cn(
              css.rating_item,
              r.position === 1 && css.animated_first,
              r.position === 2 && css.animated_second,
              r.position === 3 && css.animated_third
            )}
          >
            {/* <div className={css.rating_item_number}>{r.position}</div> */}
            <div className={css.rating_item_name}>{r.name}</div>
            <div className={css.rating_item_score}>{r.points}</div>
          </div>
        ))}
      </div>

      <div className={css.rating_me}>
        {/* <div className={css.rating_me_item_number}>{myRating.position}</div> */}
        <div className={css.rating_me_item_name}>{myRating.name}</div>
        <div className={css.rating_me_item_score}>{myRating.points}</div>
      </div>
    </div>
  );
};
