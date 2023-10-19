import { observer } from "mobx-react";
import { useParams } from "react-router";
import spotStore from "../../stores/spotStore";
import ReviewList from "../review/ReviewList";
import { baseURL } from "../../stores/instance";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import categoryStore from "../../stores/categoryStore";
import { useEffect, useState } from "react";
import { IoIosEye } from "react-icons/io";
import "react-toggle/style.css";

function SpotPage() {
  const nav = useNavigate();
  const { spotId } = useParams();
  const spot = spotStore?.getSpotsById(spotId);
  const category = categoryStore.getCategoryById(spot?.category);
  let startDate = moment(spot?.startDate).format("LL");
  let endDate = moment(spot?.endDate).format("LL");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const active = spot.isMultiple
    ? today >= new Date(startDate).d && today <= new Date(endDate)
    : today === new Date(startDate);
  const finished = spot.isMultiple
    ? today > new Date(endDate)
    : today > new Date(startDate);

  useEffect(() => {
    spotStore.fetchSpots();
  }, []);

  return (
    <div className="whitebackgroundoffers">
      {active ? (
        <>
          <div
            style={{
              fontSize: 30,
              color: "black",
              fontWeight: "600",
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="livepulse"></div>
            <h1
              className="fontfamily"
              style={{
                fontSize: 30,
                color: "black",
                fontWeight: "600",
                textAlign: "center",
                margin: 0,
                padding: 0,
                marginLeft: 10,
              }}
            >
              Live Statistics
            </h1>
          </div>
          {spot.isFree ? (
            <div className="containerLive">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 50,
                }}
              >
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 30,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Users here
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 50,
                    color: "black",
                    fontWeight: "600",
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  {spot.users.length}
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 20,
                    color: "grey",
                    textAlign: "center",
                  }}
                >
                  Only users who scanned your main QR code
                </h1>
              </div>
            </div>
          ) : (
            <div className="containerLive">
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 50,
                }}
              >
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 30,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Seats Remaining
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 50,
                    color: "black",
                    fontWeight: "600",
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  {spot.seatsRemaining}
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 20,
                    color: "grey",
                    textAlign: "center",
                  }}
                >
                  From {spot.seats} total
                </h1>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 50,
                }}
              >
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 30,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Your Revenue
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 50,
                    color: "black",
                    fontWeight: "600",
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  {spot.spotRevenue}
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 20,
                    color: "grey",
                    textAlign: "center",
                  }}
                >
                  Before commission
                </h1>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
      {finished ? (
        <>
          <div
            style={{
              fontSize: 30,
              color: "black",
              fontWeight: "600",
              textAlign: "center",
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              className="fontfamily"
              style={{
                fontSize: 30,
                color: "black",
                fontWeight: "600",
                textAlign: "center",
                margin: 0,
                padding: 0,
                marginLeft: 10,
              }}
            >
              Statistics
            </h1>
          </div>
          {spot.isFree ? (
            <div className="containerLive">
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 50,
                }}
              >
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 30,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Users visited
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 50,
                    color: "black",
                    fontWeight: "600",
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  {spot.users.length}
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 20,
                    color: "grey",
                    textAlign: "center",
                  }}
                >
                  Only users who scanned your main QR code
                </h1>
              </div>
            </div>
          ) : (
            <div className="containerLive">
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 50,
                }}
              >
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 30,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Seats Remaining
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 50,
                    color: "black",
                    fontWeight: "600",
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  {spot.seatsRemaining}
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 20,
                    color: "grey",
                    textAlign: "center",
                  }}
                >
                  From {spot.seats} total
                </h1>
              </div>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 50,
                }}
              >
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 30,
                    color: "black",
                    textAlign: "center",
                  }}
                >
                  Your Revenue
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 50,
                    color: "black",
                    fontWeight: "600",
                    textAlign: "center",
                    padding: 20,
                  }}
                >
                  {spot.spotRevenue}
                </h1>
                <h1
                  className="fontfamily"
                  style={{
                    fontSize: 20,
                    color: "grey",
                    textAlign: "center",
                  }}
                >
                  Before commission
                </h1>
              </div>
            </div>
          )}
        </>
      ) : (
        <></>
      )}
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
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h1 className="mainspottitle">{spot?.name}</h1>
              <p className="catdetails">{category?.name}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className={
                  spot?.isPublished ? "publisheddot" : "notpublisheddot"
                }
              ></div>
              <p
                className="catdetails"
                style={{ fontSize: 18, alignSelf: "center", margin: 0 }}
              >
                {spot?.isPublished ? "Published" : "Not published"}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignContent: "center",
                  alignItems: "center",
                  marginLeft: 10,
                }}
              >
                <IoIosEye
                  style={{
                    fontSize: 22,
                    color: "#e52b51",
                  }}
                  name="stats-chart-outline"
                ></IoIosEye>
                <p
                  className="catdetails"
                  style={{
                    fontSize: 16,
                    alignSelf: "center",
                    margin: 0,
                    marginLeft: 5,
                  }}
                >
                  {`${spot?.views} Views`}
                </p>
              </div>
            </div>
          </div>
          <div className="spotsettigs">
            {finished ? (
              <></>
            ) : (
              <button
                className="editorg"
                style={{ width: "50%" }}
                onClick={() => nav(`/Edit/${spotId}`)}
              >
                Edit Dest
              </button>
            )}

            <button
              className="editorg"
              style={{ width: "50%" }}
              onClick={() => nav(`/ExperianceList/${spotId}`)}
            >
              Experiance
            </button>

            {!spot.isFree && (
              <button
                className="editorg"
                style={{ width: "50%" }}
                onClick={() => nav(`/OrderHistory/${spotId}`)}
              >
                Order history
              </button>
            )}
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
              <h1 className="spotlabel">Start Time</h1>
            </div>
            {spot?.endTime && (
              <div className="spotcontainer">
                <p className="spottext">{spot?.endTime}</p>
                <h1 className="spotlabel">End Time</h1>
              </div>
            )}
            <div className="spotcontainer">
              <p className="spottext">{startDate}</p>
              <h1 className="spotlabel">Start Date</h1>
            </div>
            {spot?.isMultiple && (
              <div className="spotcontainer">
                <p className="spottext">{endDate}</p>
                <h1 className="spotlabel">End Date</h1>
              </div>
            )}
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
                  <h1 className="spotlabel">Dest Revenue</h1>
                </div>
              </>
            )}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
            overflowX: "auto",
          }}
        >
          {spot?.galleryImage0 && (
            <img
              src={`${baseURL}${spot?.galleryImage0}`}
              className="spotpagegallery"
              alt={`${baseURL}${spot?.galleryImage0}`}
            ></img>
          )}
          {spot?.galleryImage1 && (
            <img
              src={`${baseURL}${spot?.galleryImage1}`}
              className="spotpagegallery"
              alt={`${baseURL}${spot?.galleryImage1}`}
            ></img>
          )}
          {spot?.galleryImage2 && (
            <img
              src={`${baseURL}${spot?.galleryImage2}`}
              className="spotpagegallery"
              alt={`${baseURL}${spot?.galleryImage2}`}
            ></img>
          )}
          {spot?.galleryImage3 && (
            <img
              src={`${baseURL}${spot?.galleryImage3}`}
              className="spotpagegallery"
              alt={`${baseURL}${spot?.galleryImage3}`}
            ></img>
          )}
          {spot?.galleryImage4 && (
            <img
              src={`${baseURL}${spot?.galleryImage4}`}
              className="spotpagegallery"
              alt={`${baseURL}${spot?.galleryImage4}`}
            ></img>
          )}
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
            Dest Location
          </a>
          <h1 className="spotlabel">Website</h1>
          <a className="spotlink" href={spot?.website} target="_blank">
            Dest website
          </a>
          <h1 className="spotlabel">Instagram</h1>
          <a className="spotlink" href={spot?.instagram} target="_blank">
            Dest Instagram
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
