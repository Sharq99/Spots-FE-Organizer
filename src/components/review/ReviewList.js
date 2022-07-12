import { observer } from "mobx-react";
import spotStore from "../../stores/spotStore";
import reviewStore from "../../stores/reviewStore";
import ReviewItem from "./ReviewItem";

function ReviewList({reviews}) {
  const reviewList = reviews?.map(reviewID => reviewStore?.reviews?.find(review => reviewID === review?._id));
  const spotReviews = reviewList?.map((review) => (
    <ReviewItem key={review?._id} review={review} />
  ));

  return (
    <div>
          <h5 className="instructionstitle center">Spot Reviews</h5>
          <div className="singlerecipeinstruction">{spotReviews}</div>
    </div>
  );
}

export default observer(ReviewList);
