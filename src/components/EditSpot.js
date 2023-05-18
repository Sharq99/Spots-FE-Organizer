import { observer } from "mobx-react";
import { useState } from "react";
import authStore from "../stores/authStore";
import CategoryList from "./category/CategoryList";
import spotStore from "../stores/spotStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import swal from "sweetalert";
import { baseURL } from "../stores/instance";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import categoryStore from "../stores/categoryStore";
import Resizer from "react-image-file-resizer";

function EditSpot() {
  const { spotId } = useParams();
  const oldSpot = spotStore?.getSpotsById(spotId);
  const nav = useNavigate();
  const [image, setImage] = useState("");
  const [file, setFile] = useState(oldSpot?.image);
  const [galleryFile0, setGalleryFile0] = useState(oldSpot?.galleryImage0);
  const [galleryFile1, setGalleryFile1] = useState(oldSpot?.galleryImage1);
  const [galleryFile2, setGalleryFile2] = useState(oldSpot?.galleryImage2);
  const [galleryFile3, setGalleryFile3] = useState(oldSpot?.galleryImage3);
  const [galleryFile4, setGalleryFile4] = useState(oldSpot?.galleryImage4);
  const [galleryImage0, setGalleryImage0] = useState("");
  const [galleryImage1, setGalleryImage1] = useState("");
  const [galleryImage2, setGalleryImage2] = useState("");
  const [galleryImage3, setGalleryImage3] = useState("");
  const [galleryImage4, setGalleryImage4] = useState("");
  const [checked, setChecked] = useState(oldSpot?.isPublished);
  const [spot, setSpot] = useState({
    name: oldSpot?.name,
    nameAr: oldSpot?.nameAr,
    image: oldSpot?.image,
    galleryImage0: oldSpot?.galleryImage0,
    galleryImage1: oldSpot?.galleryImage1,
    galleryImage2: oldSpot?.galleryImage2,
    galleryImage3: oldSpot?.galleryImage3,
    galleryImage4: oldSpot?.galleryImage4,
    adImage0: oldSpot?.adImage0,
    adImage1: oldSpot?.adImage1,
    adImage2: oldSpot?.adImage2,
    adImage3: oldSpot?.adImage3,
    adImage4: oldSpot?.adImage4,
    location: oldSpot?.location,
    views: oldSpot?.views,
    website: oldSpot?.website,
    instagram: oldSpot?.instagram,
    description: oldSpot?.description,
    descriptionAr: oldSpot?.descriptionAr,
    details: oldSpot?.details,
    detailsAr: oldSpot?.detailsAr,
    startTime: oldSpot?.startTime,
    endTime: oldSpot?.endTime ? oldSpot?.endTime : "",
    isFree: oldSpot?.isFree,
    startDate: oldSpot?.startDate,
    isMultiple: oldSpot?.isMultiple,
    endDate: oldSpot?.isMultiple ? oldSpot?.endDate : "",
    seats: oldSpot?.seats,
    seatsRemaining: oldSpot?.seatsRemaining,
    price: oldSpot?.price,
    isAd: oldSpot?.isAd,
    category: oldSpot?.category,
    addSeats: 0,
    announcementEn: oldSpot?.announcementEn,
    announcementAr: oldSpot?.announcementAr,
    isPublished: oldSpot?.isPublished,
    termsAndConditionsOffersEn: oldSpot.termsAndConditionsOffersEn,
    termsAndConditionsOfferssAr: oldSpot.termsAndConditionsOfferssAr,
    termsAndConditionsRewardsEn: oldSpot.termsAndConditionsRewardsEn,
    termsAndConditionsRewardsAr: oldSpot.termsAndConditionsRewardsAr,
  });
  const [categoryId, setCategoryId] = useState(oldSpot.category);
  const [categoryName, setCategoryName] = useState(
    categoryStore.getCategoryById(spot.category)?.name
  );
  const handleChange = (event) => {
    setSpot({ ...spot, [event.target.name]: event.target.value });
  };
  // const handleDate = (event) =>{
  //     setSpotDate({ ...sDate, [event.target.name]: event.target.value });
  //     console.log("sDate: "+JSON.stringify(sDate));}

  const handlePublish = (e) => {
    setSpot({ ...spot, [e.target.name]: e.target.checked });
  };

  const handleFree = (event) => setSpot({ ...spot, [event.target.name]: true });

  const handlePaid = (event) =>
    setSpot({ ...spot, [event.target.name]: false });

  const handleImage = (event) => {
    let file = event.target.files[0];
    setFile(file);
    if (file.size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        1080,
        720,
        "JPEG",
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const handleGalleryImage0 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    // setGalleryImage0(image);
    // setGalleryFile0(image);
    setGalleryFile0(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage0(reader.result);
    });
    reader.readAsDataURL(image);
  };

  const handleGalleryImage1 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    setGalleryFile1(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage1(reader.result);
    });
    reader.readAsDataURL(image);
  };
  const handleGalleryImage2 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    setGalleryFile2(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage2(reader.result);
    });
    reader.readAsDataURL(image);
  };
  const handleGalleryImage3 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    setGalleryFile3(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage3(reader.result);
    });
    reader.readAsDataURL(image);
  };
  const handleGalleryImage4 = async (event) => {
    if (event.target.files[0].size > 5 * 1024 * 1024) {
      window.alert("Please upload an image smaller than 5 MB");
      return false;
    }
    const image = await resizeFile(event.target.files[0]);
    setGalleryFile4(image);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setGalleryImage4(reader.result);
    });
    reader.readAsDataURL(image);
  };

  //const updateSeats = () => {
  //  if (spot.isFree === false) {
  // if (spot.numOfDays <= 1) {
  //   spot.seats = spot.seats + parseInt(spot.addSeats);
  // }
  // else{
  //   for (let i = 0; i < spot.numOfDays; i++) {
  //     spot.days[i].seats = spot.days[i].seats + spot.addSeats;
  //   }
  // }
  // }
  // };
  // console.log(typeof spot.days[1].seats)
  const handleSubmit = async (event) => {
    event.preventDefault();
    //updateSeats();
    spot.seatsRemaining =
      spot.seatsRemaining +
      (oldSpot.seats > spot.seats
        ? -1 * (oldSpot.seats - spot.seats)
        : spot.seats - oldSpot.seats);
    try {
      const res = await spotStore.updateSpot(
        spot,
        spotId,
        file,
        categoryId,
        galleryFile0,
        galleryFile1,
        galleryFile2,
        galleryFile3,
        galleryFile4,
        spot.adImage0,
        spot.adImage1,
        spot.adImage2,
        spot.adImage3,
        spot.adImage4
      );
      if (res === "updated") {
        swal({
          title: "Success",
          text: `${spot.name} has been Updated`,
          icon: "success",
          button: "OK",
        }).then(function () {
          nav(`/spot/${spotId}`);
        });
      } else {
        swal({
          title: "Could Not Update Dest",
          text: "try to reduce images sizes",
          icon: "error",
          button: "OK",
        }).then(async function () {
          nav(`/spot/${spotId}`);
        });
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const spotstartdate = new Date(spot.startDate);
  const formattedStartDate = spotstartdate.toISOString().substr(0, 10);
  return (
    <div className="backgroundform">
      <div className="whitebackgroundoffers" style={{ height: "250%" }}>
        <div className="center">
          <h1 className="dash">Update Dest</h1>
        </div>

        <div style={{ height: "200%" }} className="whitebackgroundcreate">
          <h5 className="l-color">Upload an Image</h5>
          <h5 className="l-color-tiny">
            This is how your image will look like on the Explore screen
          </h5>
          <div className="spotimagecontainer">
            <img
              className="spotimage"
              src={image ? image : `${baseURL}${spot.image}`}
            ></img>
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
          <div className="imagechoose">
            <input
              className="input-style-choose"
              type="file"
              id="choose"
              placeholder="Image URL"
              name="image"
              onChange={handleImage}
            />
            <label className="labelchoose" for="choose">
              Choose image
            </label>
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Upload Image Gallery &nbsp; </h5>
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
                  {galleryFile0 !== "" ? (
                    <img
                      alt={galleryImage0}
                      className="spotgallery"
                      src={
                        galleryImage0
                          ? galleryImage0
                          : `${baseURL}${spot.galleryImage0}`
                      }
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage0}
                      type="file"
                      id="choose0"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem0"
                    />
                    <label
                      className="editorg"
                      for="choose0"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile0 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile0("");
                            setGalleryImage0("");
                            setSpot({ ...spot, galleryImage0: null });
                          }}
                          type="button"
                          id="delete0"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem0"
                        />
                        <label
                          className="editorg"
                          for="delete0"
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
                  {galleryFile1 !== "" ? (
                    <img
                      alt={galleryImage1}
                      className="spotgallery"
                      src={
                        galleryImage1
                          ? galleryImage1
                          : `${baseURL}${spot.galleryImage1}`
                      }
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage1}
                      type="file"
                      id="choose1"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem1"
                    />
                    <label
                      className="editorg"
                      for="choose1"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile1 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile1("");
                            setGalleryImage1("");
                            setSpot({ ...spot, galleryImage1: null });
                          }}
                          type="button"
                          id="delete1"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem1"
                        />
                        <label
                          className="editorg"
                          for="delete1"
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
                  {galleryFile2 !== "" ? (
                    <img
                      alt={galleryImage2}
                      className="spotgallery"
                      src={
                        galleryImage2
                          ? galleryImage2
                          : `${baseURL}${spot.galleryImage2}`
                      }
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage2}
                      type="file"
                      id="choose2"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem2"
                    />
                    <label
                      className="editorg"
                      for="choose2"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile2 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile2("");
                            setGalleryImage2("");
                            setSpot({ ...spot, galleryImage2: null });
                          }}
                          type="button"
                          id="delete2"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem2"
                        />
                        <label
                          className="editorg"
                          for="delete2"
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
                  {galleryFile3 !== "" ? (
                    <img
                      alt={galleryImage3}
                      className="spotgallery"
                      src={
                        galleryImage3
                          ? galleryImage3
                          : `${baseURL}${spot.galleryImage3}`
                      }
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage3}
                      type="file"
                      id="choose3"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem3"
                    />
                    <label
                      className="editorg"
                      for="choose3"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile3 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile3("");
                            setGalleryImage3("");
                            setSpot({ ...spot, galleryImage3: null });
                          }}
                          type="button"
                          id="delete3"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem3"
                        />
                        <label
                          className="editorg"
                          for="delete3"
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
                  {galleryFile4 !== "" ? (
                    <img
                      alt={galleryImage4}
                      className="spotgallery"
                      src={
                        galleryImage4
                          ? galleryImage4
                          : `${baseURL}${spot.galleryImage4}`
                      }
                    ></img>
                  ) : (
                    <label className="spotgalleryholder">
                      Recommended 1080W x 720H
                    </label>
                  )}
                  <div>
                    <input
                      onChange={handleGalleryImage4}
                      type="file"
                      id="choose4"
                      placeholder="Image URL"
                      className="input-style-choose"
                      name="galleryItem4"
                    />
                    <label
                      className="editorg"
                      for="choose4"
                      style={{ marginBottom: 15 }}
                    >
                      Choose Image
                    </label>
                    {galleryFile4 ? (
                      <>
                        <input
                          onClick={() => {
                            setGalleryFile4("");
                            setGalleryImage4("");
                            setSpot({ ...spot, galleryImage4: null });
                          }}
                          type="button"
                          id="delete4"
                          placeholder="Image URL"
                          className="input-style-choose"
                          name="galleryItem4"
                        />
                        <label
                          className="editorg"
                          for="delete4"
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
          </div>
          <div className="categorydiv">
            <h1 className="categorytitle">Choose a category</h1>
            <h1 className="categorytitlechoosen">{categoryName}</h1>
          </div>
          <CategoryList
            setCategoryId={setCategoryId}
            setCategoryName={setCategoryName}
          />
          <form onSubmit={handleSubmit} className="formdiv">
            <div className="firstdiv">
              <h5 className="l-color">Enter Dest Name (English)</h5>
              <input
                className="input-style"
                type="text"
                multiple
                value={spot.name}
                name="name"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Dest Name (Arabic)</h5>
              <input
                className="input-style"
                type="text"
                dir="rtl"
                multiple
                value={spot.nameAr}
                name="nameAr"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Location URL</h5>
              <input
                className="input-style"
                type="text"
                value={spot.location}
                name="location"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Website URL</h5>
              <input
                className="input-style"
                type="text"
                value={spot.website}
                name="website"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Instagram URL</h5>
              <input
                className="input-style"
                type="text"
                value={spot.instagram}
                name="instagram"
                onChange={handleChange}
              />
              <h5 className="l-color">
                Enter Dest Description English (200 characters max)
              </h5>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "100px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
                value={spot.description}
                name="description"
                maxLength={200}
                onChange={handleChange}
              />
              <h5 className="l-color">
                Enter Dest Description Arabic (200 characters max)
              </h5>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "100px",
                  paddingTop: "10px",
                }}
                dir="rtl"
                className="input-style"
                type="text"
                value={spot.descriptionAr}
                name="descriptionAr"
                maxLength={200}
                onChange={handleChange}
              />
            </div>

            <div
              style={{
                width: "100%",
              }}
            >
              <h5 className="l-color">Enter Dest Details (English)</h5>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "100px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
                value={spot.details}
                name="details"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Dest Details (Arabic)</h5>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "100px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
                dir="rtl"
                value={spot.detailsAr}
                name="detailsAr"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Start Time</h5>
              <input
                className="input-style"
                type="time"
                value={spot.startTime}
                name="startTime"
                onChange={handleChange}
              />

              {spot.endTime === "" || spot.endTime === null ? (
                <></>
              ) : (
                <>
                  <h5 className="l-color">Enter End Time</h5>
                  <input
                    className="input-style"
                    type="time"
                    value={spot.endTime}
                    name="endTime"
                    onChange={handleChange}
                  />
                </>
              )}
              <h5 className="l-color">Enter Start Date</h5>
              <input
                className="input-style"
                type="date"
                value={formattedStartDate}
                name="startDate"
                onChange={handleChange}
              />
              {spot?.isMultiple && (
                <>
                  <h5 className="l-color">Enter End Date</h5>
                  <input
                    className="input-style"
                    type="date"
                    value={
                      spot?.isMultiple
                        ? new Date(spot.endDate).toISOString().substr(0, 10)
                        : ""
                    }
                    name="endDate"
                    onChange={handleChange}
                  />
                </>
              )}
              <h5 className="l-color">Publish Dest</h5>
              <Toggle
                defaultChecked={checked}
                icons={false}
                name="isPublished"
                onChange={handlePublish}
              />

              {/* <h5 className="l-color">Is the Dest free to Enter?</h5>
              <input
                checked={spot.isFree === true ? "checked" : ""}
                type="radio"
                id="payment"
                name="isFree"
                className="radio"
                onChange={handleFree}
              />
              <label className="radiotext" for="payment">
                Yes
              </label>
              <input
                checked={spot.isFree === true ? "" : "checked"}
                type="radio"
                id="payment"
                name="isFree"
                className="radio"
                onChange={handlePaid}
              />
              <label for="payment">No</label>
              {spot.isFree === false ? (
                <div>
                  <h5 className="l-color">Enter Total Number of Tickets</h5>
                  <input
                    className="input-style"
                    type="number"
                    value={spot.seats}
                    name="seats"
                    onChange={handleChange}
                  />
                  <h5 className="l-color">Enter Price Per Ticket</h5>
                  <input
                    className="input-style"
                    type="number"
                    value={spot.price}
                    name="price"
                    onChange={handleChange}
                  />
                </div>
              ) : (
                <></>
              )} */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <input
                  className="button-sign ing-create"
                  type="submit"
                  value="Update Spot"
                />
                <button
                  className="button-cancel"
                  onClick={() => nav(`/spot/${spotId}`)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSpot;
