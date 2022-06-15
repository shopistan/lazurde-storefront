import React from "react";
import { FilledStar, Star } from "components/icons";
import styles from "./style.module.scss";

interface StarRatingProps {
  count?: number | string;
  rating?: number | string;
  onClick?: Function;
  starWidth?: number | string;
  starHeight?: number | string;
  pointerEventsNone?: boolean;
}

const StarRating = ({
  count,
  rating,
  onClick = () => {},
  starWidth = 18,
  starHeight = 18,
  pointerEventsNone = false,
}: StarRatingProps): JSX.Element => {
  return (
    <div
      style={{
        pointerEvents: pointerEventsNone ? "none" : "auto",
      }}
    >
      {[...Array(count)]?.map((_, index) => {
        return (
          <>
            {rating > index ? (
              <FilledStar
                key={index}
                className={styles["filled-star"]}
                fill="#C3A956"
                onClick={() => onClick && onClick(index)}
                width={starWidth}
                height={starHeight}
              />
            ) : (
              <Star
                key={index}
                className={styles["empty-star"]}
                icon="star"
                onClick={() => onClick && onClick(index)}
                width={starWidth}
                height={starHeight}
              />
            )}
          </>
        );
      })}
    </div>
  );
};

export default StarRating;
