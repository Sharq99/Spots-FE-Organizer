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
import { baseURL } from "../../stores/instance";

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
  const [adFile0, setAdFile0] = useState(spot?.adImage0);
  const [adFile1, setAdFile1] = useState(spot?.adImage1);
  const [adFile2, setAdFile2] = useState(spot?.adImage2);
  const [adFile3, setAdFile3] = useState(spot?.adImage3);
  const [adFile4, setAdFile4] = useState(spot?.adImage4);
  const [adImage0, setAdImage0] = useState("");
  const [adImage1, setAdImage1] = useState("");
  const [adImage2, setAdImage2] = useState("");
  const [adImage3, setAdImage3] = useState("");
  const [adImage4, setAdImage4] = useState("");
  const [newspot, setNewspot] = useState({
    name: spot?.name,
    nameAr: spot?.nameAr,
    image: spot?.image,
    galleryImage0: spot?.galleryImage0,
    galleryImage1: spot?.galleryImage1,
    galleryImage2: spot?.galleryImage2,
    galleryImage3: spot?.galleryImage3,
    galleryImage4: spot?.galleryImage4,
    adImage0: spot?.adImage0,
    adImage1: spot?.adImage1,
    adImage2: spot?.adImage2,
    adImage3: spot?.adImage3,
    adImage4: spot?.adImage4,
    location: spot?.location,
    description: spot?.description,
    descriptionAr: spot?.descriptionAr,
    details: spot?.details,
    detailsAr: spot?.detailsAr,
    startTime: spot?.startTime,
    endTime: spot?.endTime ? spot?.endTime : "",
    isFree: spot?.isFree,
    startDate: spot?.startDate,
    endDate: spot?.isMultiple === true ? spot?.endDate : "",
    isMultiple: spot?.isMultiple,
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
        newspot.galleryImage4,
        newspot.adImage0,
        newspot.adImage1,
        newspot.adImage2,
        newspot.adImage3,
        newspot.adImage4
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
        newspot.galleryImage4,
        newspot.adImage0,
        newspot.adImage1,
        newspot.adImage2,
        newspot.adImage3,
        newspot.adImage4
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
  const handleAdImages = async (event) => {
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
        newspot.galleryImage4,
        adFile0,
        adFile1,
        adFile2,
        adFile3,
        adFile4
      );
      swal({
        title: "Success",
        text: `Ad images have been Updated`,
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleAdImage0 = (event) => {
    let file0 = event.target.files[0];
    if (file0.size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    setAdFile0(file0);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setAdImage0(reader.result);
    });
    reader.readAsDataURL(file0);
  };

  const handleAdImage1 = (event) => {
    let file1 = event.target.files[0];
    if (file1.size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    setAdFile1(file1);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setAdImage1(reader.result);
    });
    reader.readAsDataURL(file1);
  };
  const handleAdImage2 = (event) => {
    let file2 = event.target.files[0];
    if (file2.size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    setAdFile2(file2);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setAdImage2(reader.result);
    });
    reader.readAsDataURL(file2);
  };
  const handleAdImage3 = (event) => {
    let file3 = event.target.files[0];
    if (file3.size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    setAdFile3(file3);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setAdImage3(reader.result);
    });
    reader.readAsDataURL(file3);
  };
  const handleAdImage4 = (event) => {
    let file4 = event.target.files[0];
    if (file4.size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    setAdFile4(file4);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setAdImage4(reader.result);
    });
    reader.readAsDataURL(file4);
  };
  const spotOffers = offerStore.offers.filter((offer) => offer.spot === spotId);
  const spotRewards = rewardStore.rewards.filter(
    (reward) => reward.spot === spotId
  );
  return (
    <div className="center">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1 className="dash">Experience panel</h1>
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

          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Upload Ads Gallery&nbsp; </h5>
            </div>
            <h5 className="l-color-tiny-image">You can add up to 5 images</h5>
            <div className="spotimagecontainer">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "nowrap",
                  whiteSpace: "nowrap",
                  overflowX: "auto",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {adFile0 ? (
                    <img
                      alt={adImage0}
                      className="spotgalleryad"
                      src={adImage0 ? adImage0 : `${baseURL}${spot.adImage0}`}
                    ></img>
                  ) : (
                    <label className="spotgalleryholderad">
                      Recommended 1620W x 1080H
                    </label>
                  )}

                  <div>
                    <input
                      onChange={handleAdImage0}
                      type="file"
                      id="choosead0"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="adImage0"
                    />
                    <label
                      className="editorg"
                      for="choosead0"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {adFile0 ? (
                      <>
                        <input
                          onClick={() => {
                            setAdFile0("");
                            setAdImage0("");
                            setNewspot({ ...newspot, adImage0: null });
                          }}
                          type="button"
                          id="deletead0"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="adImage0"
                        />
                        <label
                          className="editorg"
                          for="deletead0"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {adFile1 ? (
                    <img
                      alt={adImage1}
                      className="spotgalleryad"
                      src={adImage1 ? adImage1 : `${baseURL}${spot.adImage1}`}
                    ></img>
                  ) : (
                    <label className="spotgalleryholderad">
                      Recommended 1620W x 1080H
                    </label>
                  )}

                  <div>
                    <input
                      onChange={handleAdImage1}
                      type="file"
                      id="choosead1"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="adImage1"
                    />
                    <label
                      className="editorg"
                      for="choosead1"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {adFile1 ? (
                      <>
                        <input
                          onClick={() => {
                            setAdFile1("");
                            setAdImage1("");
                            setNewspot({ ...newspot, adImage1: null });
                          }}
                          type="button"
                          id="deletead1"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="adImage1"
                        />
                        <label
                          className="editorg"
                          for="deletead1"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {adFile2 ? (
                    <img
                      alt={adImage2}
                      className="spotgalleryad"
                      src={adImage2 ? adImage2 : `${baseURL}${spot.adImage2}`}
                    ></img>
                  ) : (
                    <label className="spotgalleryholderad">
                      Recommended 1620W x 1080H
                    </label>
                  )}

                  <div>
                    <input
                      onChange={handleAdImage2}
                      type="file"
                      id="choosead2"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="adImage2"
                    />
                    <label
                      className="editorg"
                      for="choosead2"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {adFile2 ? (
                      <>
                        <input
                          onClick={() => {
                            setAdFile2("");
                            setAdImage2("");
                            setNewspot({ ...newspot, adImage2: null });
                          }}
                          type="button"
                          id="deletead2"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="adImage2"
                        />
                        <label
                          className="editorg"
                          for="deletead2"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {adFile3 ? (
                    <img
                      alt={adImage3}
                      className="spotgalleryad"
                      src={adImage3 ? adImage3 : `${baseURL}${spot.adImage3}`}
                    ></img>
                  ) : (
                    <label className="spotgalleryholderad">
                      Recommended 1620W x 1080H
                    </label>
                  )}

                  <div>
                    <input
                      onChange={handleAdImage3}
                      type="file"
                      id="choosead3"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="adImage3"
                    />
                    <label
                      className="editorg"
                      for="choosead3"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {adFile3 ? (
                      <>
                        <input
                          onClick={() => {
                            setAdFile3("");
                            setAdImage3("");
                            setNewspot({ ...newspot, adImage3: null });
                          }}
                          type="button"
                          id="deletead3"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="adImage3"
                        />
                        <label
                          className="editorg"
                          for="deletead3"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  {adFile4 ? (
                    <img
                      alt={adImage4}
                      className="spotgalleryad"
                      src={adImage4 ? adImage4 : `${baseURL}${spot.adImage4}`}
                    ></img>
                  ) : (
                    <label className="spotgalleryholderad">
                      Recommended 1620W x 1080H
                    </label>
                  )}

                  <div>
                    <input
                      onChange={handleAdImage4}
                      type="file"
                      id="choosead4"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="adImage4"
                    />
                    <label
                      className="editorg"
                      for="choosead4"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {adFile4 ? (
                      <>
                        <input
                          onClick={() => {
                            setAdFile4("");
                            setAdImage4("");
                            setNewspot({ ...newspot, adImage4: null });
                          }}
                          type="button"
                          id="deletead4"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="adImage4"
                        />
                        <label
                          className="editorg"
                          for="deletead4"
                          style={{ marginBottom: 15 }}
                        >
                          Remove
                        </label>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignSelf: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <h5 className="l-color">Max file size is 5 MB</h5>
              <h5
                style={{
                  color: "red",
                  marginTop: 10,
                  alignSelf: "center",
                }}
              >
                &nbsp; *
              </h5>
            </div>
            <div
              style={{
                justifyContent: "center",
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
                value="Update Ads"
                onClick={handleAdImages}
              />
            </div>
          </div>

          <div className="offerdiv">
            <h1 className="dashannouncement">Offers</h1>
            <div>
              <button
                className="editorg"
                onClick={() => nav(`/OffersTerms/${spotId}`)}
              >
                Terms and Conditions
              </button>
              <button
                className="editorg"
                onClick={() => nav(`/Experience/${spotId}`)}
              >
                Add Offer
              </button>
            </div>
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
            <div>
              <button
                className="editorg"
                onClick={() => nav(`/RewardsTerms/${spotId}`)}
              >
                Terms and Conditions
              </button>
              <button
                className="editorg"
                onClick={() => nav(`/RewardExperience/${spotId}`)}
              >
                Add Reward
              </button>
            </div>
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
