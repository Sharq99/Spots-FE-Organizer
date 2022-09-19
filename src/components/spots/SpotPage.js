import { observer } from "mobx-react";
import { useParams } from "react-router";
import spotStore from "../../stores/spotStore";
import ReviewList from "../review/ReviewList";
import { baseURL } from "../../stores/instance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import categoryStore from "../../stores/categoryStore";

function SpotPage() {
  const nav = useNavigate();
  const { spotId } = useParams();
  const spot = spotStore?.getSpotsById(spotId);
  const category = categoryStore.getCategoryById(spot.category);
  let date = moment(spot?.startDate).format("LL");
  return (
    <div className="whitebackground">
      <div className="container" style={{ width: "50%" }}>
        <div
          className="center"
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
          }}
        >
          <div className="headingdetails">
            <h1 className="mainspottitle">{spot?.name}</h1>
            {/* <h1 className="mainspottitle">{spot?.nameAr}</h1> */}
            <p className="catdetails">{category.name}</p>
          </div>
          <div className="spotsettigs">
            <button className="editorg" onClick={() => nav(`/Edit/${spotId}`)}>
              Edit Spot
            </button>
            <button
              className="editorg"
              onClick={() => nav(`/ExperianceList/${spotId}`)}
            >
              Experiance
            </button>
          </div>
        </div>
        <div
          className="spotimagediv"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <img
            src={`${baseURL}${spot?.image}`}
            className="spotimage"
            style={{
              paddingBottom: 0,
              marginBottom: 0,
              borderWidth: 0,
              justifyContent: "flex-start",
            }}
          ></img>
          <div
            className="spotinfodiv"
            style={{ paddingBottom: "20px", paddingTop: "20px" }}
          >
            <div className="spotcontainer">
              <p className="spottext">{spot?.startTime}</p>
              <h1 className="spotlabel">Time</h1>
            </div>
            <div className="spotcontainer">
              <p className="spottext">{date}</p>
              <h1 className="spotlabel">Date</h1>
            </div>
            {spot?.isFree === true ? (
              <div className="spotcontainer">
                <p className="spottext">Free</p>
                <h1 className="spotlabel">Event Entry</h1>
              </div>
            ) : (
              <>
                <div className="spotcontainer">
                  <p className="spottext">{spot?.price}KD per Ticket</p>
                  <h1 className="spotlabel">Event Entry</h1>
                </div>
                <div className="spotcontainer">
                  <p className="spottext">{spot?.seats}</p>
                  <h1 className="spotlabel">Seats</h1>
                </div>
                <div className="spotcontainer">
                  <p className="spottext">{spot?.spotRevenue * spot?.seats}</p>
                  <h1 className="spotlabel">Spot Revenue</h1>
                </div>
              </>
            )}
            <div className="spotcontainer">
              <p className="spottext">{spot?.users?.length}</p>
              <h1 className="spotlabel">Spotted Me</h1>
            </div>
          </div>
        </div>
        <div className="spotinfobig">
          <h1 className="spotlabel">Description</h1>
          <p className="spottextbig">{spot?.description}</p>
          <h1 className="spotlabel">Details</h1>
          <p className="spottextbig">{spot?.details}</p>
          <h1 className="spotlabel">Description in Arabic</h1>
          <p className="spottextbig">{spot?.descriptionAr}</p>
          <h1 className="spotlabel">Details in Arabic</h1>
          <p className="spottextbig">{spot?.detailsAr}</p>
          <h1 className="spotlabel">Location</h1>
          <a className="spotlink" href={spot?.location} target="_blank">
            Spot Location
          </a>
        </div>
        {spot?.reviews.length !== 0 ? (
          <ReviewList reviews={spot?.reviews} />
        ) : (
          <h1 className="spotlabel center">No Reviews Yet</h1>
        )}
      </div>
    </div>
  );
}

export default observer(SpotPage);
