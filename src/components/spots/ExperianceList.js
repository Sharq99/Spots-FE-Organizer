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
import html2canvas from "html2canvas";
import { ReactComponent as DestLogo } from "../pics/DestLogo.svg";
import GenerateQrCodeStamp from "../../qrCodeStamp";
import QRCode from "react-qr-code";

function downloadDivAsImageEnglish(divId) {
  const div = document.getElementById(divId);
  html2canvas(div, { backgroundColor: null }).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "DestStampEnglish.png";
    link.click();
  });
}
function downloadDivAsImageArabic(divId) {
  const div = document.getElementById(divId);
  html2canvas(div, { backgroundColor: null }).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "DestStampArabic.png";
    link.click();
  });
}

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

  const spotOffers = offerStore.offers.filter((offer) => offer.spot === spotId);
  const spotRewards = rewardStore.rewards.filter(
    (reward) => reward.spot === spotId
  );
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
              Your Dest's Main Qr Code
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
            {spotOffers.length > 0 ? (
              spotOffers.map((offer) => (
                <li
                  style={{
                    width: "50%",
                    textAlign: "left",
                  }}
                >
                  <OfferItem key={offer._id} offer={offer} />
                </li>
              ))
            ) : (
              <div>
                <h1 className="nooffersandrewardsplaceholder">
                  No offers added yet!
                </h1>
              </div>
            )}
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
            {spotRewards.length > 0 ? (
              spotRewards.map((reward) => (
                <li
                  style={{
                    width: "50%",
                    textAlign: "left",
                  }}
                >
                  <RewardItem key={reward._id} reward={reward} />
                </li>
              ))
            ) : (
              <div>
                <h1 className="nooffersandrewardsplaceholder">
                  No rewards added yet!
                </h1>
              </div>
            )}
          </ul>
          <h1 className="dashannouncement">Create Points</h1>
          <GenerateQrCode />
          <h1 className="dashannouncement">Dest Stamp</h1>
          <h1 className="destdownloads">
            Click on the one you want to download
          </h1>
          {spot.isFree ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                id="deststamp"
                className="deststamp"
                onClick={() => downloadDivAsImageEnglish("deststamp")}
              >
                <DestLogo
                  src={require("../pics/DestLogo.svg")}
                  className="deststampimage"
                />
                <div>
                  <h1
                    style={{ paddingRight: 60 }}
                    className="deststamptitlesmall"
                  >
                    Find us on
                  </h1>
                  <h1
                    style={{ paddingRight: 30 }}
                    className="deststamptitlelarge"
                  >
                    Dest
                  </h1>
                </div>
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width: 110,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    paddingRight: 6,
                  }}
                >
                  <QRCode
                    size={90}
                    style={{
                      alignSelf: "center",
                      height: 90,
                      width: 90,
                    }}
                    fgColor="#e52b51"
                    value={`dest://SpotDetails/${spotId}`}
                  />
                </div>
              </div>
              <div
                id="deststampar"
                className="deststampar"
                onClick={() => downloadDivAsImageArabic("deststampar")}
              >
                <DestLogo
                  src={require("../pics/DestLogo.svg")}
                  className="deststampimage"
                />
                <div>
                  <h1
                    style={{ paddingLeft: 70 }}
                    className="deststamptitlesmallar"
                  >
                    تجدنا في
                  </h1>
                  <h1
                    style={{ paddingLeft: 40 }}
                    className="deststamptitlelargear"
                  >
                    ديست
                  </h1>
                </div>
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width: 110,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    paddingLeft: 6,
                  }}
                >
                  <QRCode
                    size={90}
                    style={{
                      alignSelf: "center",
                      height: 90,
                      width: 90,
                    }}
                    fgColor="#e52b51"
                    value={`dest://SpotDetails/${spotId}`}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                id="deststamp"
                className="deststamp"
                onClick={() => downloadDivAsImageEnglish("deststamp")}
              >
                <DestLogo
                  src={require("../pics/DestLogo.svg")}
                  className="deststampimage"
                />
                <div>
                  <h1 className="deststamptitlesmall">Get Tickets from</h1>
                  <h1 className="deststamptitlelarge">Dest</h1>
                </div>
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width: 110,
                    borderTopRightRadius: 20,
                    borderBottomRightRadius: 20,
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    paddingRight: 6,
                  }}
                >
                  <QRCode
                    size={90}
                    style={{
                      alignSelf: "center",
                      height: 90,
                      width: 90,
                    }}
                    fgColor="#e52b51"
                    value={`dest://SpotDetails/${spotId}`}
                  />
                </div>
              </div>
              <div
                id="deststampar"
                className="deststampar"
                onClick={() => downloadDivAsImageArabic("deststampar")}
              >
                <DestLogo
                  src={require("../pics/DestLogo.svg")}
                  className="deststampimage"
                />
                <div>
                  <h1 className="deststamptitlesmallar">تجد التذاكر في</h1>
                  <h1 className="deststamptitlelargear">ديست</h1>
                </div>
                <div
                  style={{
                    height: "100%",
                    backgroundColor: "white",
                    width: 110,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
                    paddingLeft: 6,
                  }}
                >
                  <QRCode
                    size={90}
                    style={{
                      alignSelf: "center",
                      height: 90,
                      width: 90,
                    }}
                    fgColor="#e52b51"
                    value={`dest://SpotDetails/${spotId}`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(ExperianceList);
