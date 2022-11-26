import { observer } from "mobx-react";
import spotStore from "../../stores/spotStore";
import { useNavigate, useParams } from "react-router-dom";
import QrCode from "../../qrCode";
import OfferItem from "../offer/OfferItem";
import offerStore from "../../stores/offerStore";
import swal from "sweetalert";
import { useState } from "react";
import rewardStore from "../../stores/rewardStore";
import RewardItem from "../reward/RewardItem";
import GenerateQrCode from "../../GenerateQrCode";

function ExperianceList() {
  const nav = useNavigate();
  const { spotId } = useParams();
  const spot = spotStore.getSpotsById(spotId);
  const [newspot, setNewspot] = useState({
    name: spot?.name,
    image: spot?.image,
    location: spot?.location,
    description: spot?.description,
    details: spot?.details,
    startTime: spot?.startTime,
    isFree: spot?.isFree,
    isAd: spot?.isAd,
    startDate: spot?.startDate,
    endDate: spot?.endDate,
    seats: spot?.seats,
    price: spot?.price,
    category: spot?.category,
    addSeats: 0,
    announcement: "",
  });
  const handleAnnouncementText = (event) => {
    newspot.announcement = event.target.value;
  };
  const handleAnnouncement = async (event) => {
    event.preventDefault();
    try {
      await spotStore.updateSpot(newspot, spotId, spot?.image, spot?.category);
      swal({
        title: "Success",
        text: `announcement has been Updated`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="center">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1 className="dash">{spot?.name}'s experience</h1>
        </div>
        <div className="offercontainer">
          <div
            className="offerdiv"
            style={{
              paddingLeft: 90,
              paddingRight: 90,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1 style={{ fontSize: 40 }} className="l-color">
              Your Spot's Main Qr Code
            </h1>
            <QrCode spotId={spotId} />
          </div>
          <div>
            <h1 className="dashannouncement">Announcement</h1>
            <h5 className="l-color">Current Announcement</h5>
            <h5 style={{ padding: 20 }} className="l-color">
              {spot?.announcement}
            </h5>
            <h5 className="l-color">New Announcement</h5>
            <input
              className="input-style"
              style={{ margin: 0, width: "100%" }}
              type="text"
              multiple
              placeholder="Enter Announcement"
              name="announcement"
              onChange={handleAnnouncementText}
            />
            <div
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                display: "flex",
                alignContent: "flex-end",
              }}
            >
              <input
                style={{
                  padding: 10,
                  textAlign: "center",
                  width: "20%",
                }}
                className="button-sign ing-create"
                value="Announce"
                onClick={handleAnnouncement}
              />
            </div>
          </div>
          <div className="offerdiv">
            <h1 className="dashannouncement">Offers</h1>
            <button
              className="editorg"
              onClick={() => nav(`/Experience/${spotId}`)}
            >
              Add Offer
            </button>
          </div>

          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              flexWrap: "wrap",
              alignContent: "center",
            }}
          >
            {offerStore.offers
              .filter((offer) => offer.spot === spotId)
              .map((offer) => (
                <li
                  style={{
                    width: "50%",
                    textAlign: "left",
                  }}
                >
                  <OfferItem key={offer._id} offer={offer} />
                </li>
              ))}
          </ul>

          <div className="offerdiv">
            <h1 className="dashannouncement">Rewards</h1>
            <button
              className="editorg"
              onClick={() => nav(`/RewardExperience/${spotId}`)}
            >
              Add Reward
            </button>
          </div>

          <ul
            style={{
              listStyleType: "none",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              flexWrap: "wrap",
              alignContent: "center",
            }}
          >
            {rewardStore.rewards
              .filter((reward) => reward.spot === spotId)
              .map((reward) => (
                <li
                  style={{
                    width: "50%",
                    textAlign: "left",
                  }}
                >
                  <RewardItem key={reward._id} reward={reward} />
                </li>
              ))}
          </ul>
          <h1 className="dashannouncement">Create Points</h1>
          <GenerateQrCode />
        </div>
      </div>
    </div>
  );
}

export default observer(ExperianceList);
