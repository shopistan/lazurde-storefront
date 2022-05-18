import React from "react";
import styles from "./style.module.scss";
import { Star, FilledStar } from "components/icons";
interface StarRatingsProps {
  rating?: number;
}

const StarRatings = ({ rating }: StarRatingsProps): JSX.Element => {
  let filledStars: number[] = [];
  let remaingStars: number[] = [];

  switch (Number(rating)) {
    case 0:
      filledStars = [];
      remaingStars = [1, 2, 3, 4, 5];
      break;
    case 1:
      filledStars = [1];
      remaingStars = [1, 2, 3, 4];
      break;
    case 2:
      filledStars = [1, 2];
      remaingStars = [1, 2, 3];
      break;
    case 3:
      filledStars = [1, 2, 3];
      remaingStars = [1, 2];
      break;
    case 4:
      filledStars = [1, 2, 3, 4];
      remaingStars = [1];
      break;
    case 5:
      filledStars = [1, 2, 3, 4, 5];
      remaingStars = [];
      break;
    default:
  }
  return (
    <div className={styles["star-wrapper"]}>
      {filledStars &&
        filledStars?.map((item, index) => {
          return (
            <div className={styles["star"]} key={index}>
              <FilledStar fill="#C3A956" />
            </div>
          );
        })}
      {remaingStars &&
        remaingStars?.map((item, index) => {
          return (
            <div className={styles["star"]} key={index}>
              <Star fill="#C3A956" />
            </div>
          );
        })}
    </div>
  );
};
export default StarRatings;
