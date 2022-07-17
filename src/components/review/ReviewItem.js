import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import Stars from "./Stars";
import moment from "moment";

function ReviewItem({ review }) {
  let date = moment(review?.date).format("LL")
  return (
    <div>
      <div className="center-Review">
        <img src={`${baseURL}${review?.user?.image}`} className="reviewImage"></img>
        <h5 className="review-name">{review?.user?.username}</h5>
      </div>
        <div>{<Stars stars={review?.stars}/>}</div>
        <p>{review?.description}</p>
        <p>{date}</p>
    </div>
  );
}

export default ReviewItem;
