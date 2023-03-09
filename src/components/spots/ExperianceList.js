import { observer } from "mobx-react";
import spotStore from "../../stores/spotStore";
import { useNavigate, useParams } from "react-router-dom";
import MainQrCode from "../../qrCode";
import OfferItem from "../offer/OfferItem";
import offerStore from "../../stores/offerStore";
import swal from "sweetalert";
import { useState } from "react";
import rewardStore from "../../stores/rewardStore";
import RewardItem from "../reward/RewardItem";
import GenerateQrCode from "../../GenerateQrCode";
import html2canvas from "html2canvas";
import { ReactComponent as DestLogo } from "../pics/DestLogo.svg";
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
    nameAr: spot?.nameAr,
    image: spot?.image,
    galleryImage0: spot?.galleryImage0,
    galleryImage1: spot?.galleryImage1,
    galleryImage2: spot?.galleryImage2,
    galleryImage3: spot?.galleryImage3,
    galleryImage4: spot?.galleryImage4,
    location: spot?.location,
    description: spot?.description,
    descriptionAr: spot?.descriptionAr,
    details: spot?.details,
    detailsAr: spot?.detailsAr,
    startTime: spot?.startTime,
    endTime: spot?.endTime ? spot?.endTime : "",
    isFree: spot?.isFree,
    startDate: spot?.startDate,
    endDate: spot?.endDate,
    seats: spot?.seats,
    seatsRemaining: spot?.seatsRemaining,
    price: spot?.price,
    isAd: spot?.isAd,
    category: spot?.category,
    addSeats: spot?.addSeats,
    announcementEn: spot?.announcementEn,
    announcementAr: spot?.announcementAr,
    isPublished: spot?.isPublished,
  });
  const handleAnnouncementTextEn = (event) => {
    newspot.announcementEn = event.target.value;
  };
  const handleAnnouncementEn = async (event) => {
    event.preventDefault();
    try {
      await spotStore.updateSpot(
        newspot,
        spotId,
        spot?.image,
        spot?.category,
        newspot.galleryImage0,
        newspot.galleryImage1,
        newspot.galleryImage2,
        newspot.galleryImage3,
        newspot.galleryImage4
      );
      swal({
        title: "Success",
        text: `English announcement has been Updated`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleAnnouncementTextAr = (event) => {
    newspot.announcementAr = event.target.value;
  };
  const handleAnnouncementAr = async (event) => {
    event.preventDefault();
    try {
      await spotStore.updateSpot(
        newspot,
        spotId,
        spot?.image,
        spot?.category,
        newspot.galleryImage0,
        newspot.galleryImage1,
        newspot.galleryImage2,
        newspot.galleryImage3,
        newspot.galleryImage4
      );
      swal({
        title: "Success",
        text: `Arabic announcement has been Updated`,
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
            <MainQrCode spotId={spotId} />
          </div>
          <div>
            <h1 className="dashannouncement">Announcements</h1>
            <h5 className="l-color">English Announcement</h5>
            <h5 style={{ padding: 20, paddingLeft: 0 }} className="l-color">
              {spot?.announcementEn}
            </h5>
            <h5 className="l-color">New English Announcement</h5>
            <input
              className="input-style"
              style={{ margin: 0, width: "100%" }}
              type="text"
              multiple
              placeholder="Enter Announcement"
              name="announcement"
              onChange={handleAnnouncementTextEn}
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
                onClick={handleAnnouncementEn}
              />
            </div>
          </div>
          <div>
            <h5 className="l-color">Arabic Announcement</h5>
            <h5 style={{ padding: 20, paddingLeft: 0 }} className="l-color">
              {spot?.announcementAr}
            </h5>
            <h5 className="l-color">New Arabic Announcement</h5>
            <input
              className="input-style"
              style={{ margin: 0, width: "100%" }}
              type="text"
              multiple
              placeholder="Enter Announcement"
              name="announcement"
              onChange={handleAnnouncementTextAr}
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
                onClick={handleAnnouncementAr}
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
          {spot?.isFree ? (
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
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
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
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
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
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
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
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center",
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
