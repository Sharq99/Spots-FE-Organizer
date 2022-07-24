import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import Stars from "./Stars";
import moment from "moment";

function ReviewItem({ review }) {
  let date = moment(review?.date).format("LL");
  return (
    <div
      style={{
        borderBottomColor: "rgba(178, 174, 174, 0.658)",
        borderBottomWidth: " 0.4px",
        borderBottomStyle: "solid",
        margin: "30px",
      }}
    >
      <div className="center-Review">
        <img
          src={`${baseURL}${review?.user?.image}`}
          className="reviewImage"
        ></img>
        <div className="reviewnamedate">
          <h5 className="review-name">{review?.user?.username}</h5>
          <h5 className="review-name">{date}</h5>
        </div>
      </div>
      <div>{<Stars stars={review?.stars} />}</div>
      <p className="spottextbig">{review?.description}</p>
    </div>
  );
}

export default ReviewItem;
