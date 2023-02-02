import { useState } from "react";
import CategoryList from "./category/CategoryList";
import spotStore from "../stores/spotStore";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import authStore from "../stores/authStore";

function CreateSpot() {
  const nav = useNavigate();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  //const [updateOrganizer, setUpdateOrganizer] = useState({
  //phone: authStore.organizer.phone,
  //bio: authStore.organizer.bio,
  //email: authStore.organizer.email,
  //image: authStore.organizer.image,
  //numofDests: authStore.organizer.numofDests,
  //displayNameEn: authStore.organizer.displayNameEn,
  //displayNameAr: authStore.organizer.displayNameAr,
  //username: authStore.organizer.username,
  //});
  const [spot, setSpot] = useState({
    name: "",
    nameAr: "",
    image: "",
    video: "",
    location: "",
    description: "",
    descriptionAr: "",
    details: "",
    detailsAr: "",
    startTime: "",
    endTime: "",
    isFree: true,
    isAd: false,
    startDate: 0,
    endDate: 0,
    seats: 0,
    addSeats: 0,
    price: 0,
    days: [],
    numOfDays: 1,
    spotRevenue: 0,
    announcement: "",
    seatsRemaining: 0,
  });
  const [spotName, setSpotName] = useState(true);
  const [spotNameAr, setSpotNameAr] = useState(true);
  const [spotImage, setSpotImage] = useState(true);
  const [spotLocation, setSpotLocation] = useState(true);
  const [spotDescription, setSpotDescription] = useState(true);
  const [spotDescriptionAr, setSpotDescriptionAr] = useState(true);
  const [spotDetails, setSpotDetails] = useState(true);
  const [spotDetailsAr, setSpotDetailsAr] = useState(true);
  const [spotStartDate, setSpotStartDate] = useState(true);
  const [startTime, setStartTime] = useState(true);
  const [endTime, setEndTime] = useState(true);
  const [addEndTimeRadio, setAddEndTimeRadio] = useState(false);
  const [spotSeats, setSpotSeats] = useState(true);
  const [spotPrice, setSpotPrice] = useState(true);
  spot.announcement = `Welcome to ${spot.name}, enjoy our amazing offers and rewards`;
  const [categoryId, setCategoryId] = useState("62d828fff35c707fdaa7422c");
  const [categoryName, setCategoryName] = useState();

  const handleChange = (event) => {
    setSpot({ ...spot, [event.target.name]: event.target.value });
    if (event.target.name === "name") {
      setSpotName(false);
    } else if (event.target.name === "nameAr") {
      setSpotNameAr(false);
    } else if (event.target.name === "location") {
      setSpotLocation(false);
    } else if (event.target.name === "description") {
      setSpotDescription(false);
    } else if (event.target.name === "descriptionAr") {
      setSpotDescriptionAr(false);
    } else if (event.target.name === "details") {
      setSpotDetails(false);
    } else if (event.target.name === "detailsAr") {
      setSpotDetailsAr(false);
    } else if (event.target.name === "startDate") {
      setSpotStartDate(false);
    } else if (event.target.name === "startTime") {
      setStartTime(false);
    } else if (event.target.name === "endTime") {
      setEndTime(false);
    } else if (event.target.name === "price") {
      setSpotPrice(false);
    } else if (event.target.name === "seats") {
      setSpotSeats(false);
    }
  };
  // const handleDate = (event) =>{
  //     setSpotDate({ ...sDate, [event.target.name]: event.target.value });
  //     console.log("sDate: "+JSON.stringify(sDate));}

  // const handleYear = (event) =>{
  //     setSpot({ ...spot.spotDate, year: event.target.value });
  //     console.log("spot: "+JSON.stringify(spot));
  // }

  // const handleMonth = (event) =>{
  //     setSpot({ ...spot.spotDate, month: event.target.value });
  //     console.log("spot: "+JSON.stringify(spot));
  // }

  // const handleDay = (event) =>{
  //     setSpot({ ...spot.spotDate, day: event.target.value });
  //     console.log("spot: "+JSON.stringify(spot));
  // }

  const handleFree = (event) => setSpot({ ...spot, [event.target.name]: true });

  const handlePaid = (event) =>
    setSpot({ ...spot, [event.target.name]: false });

  const handleImage = (event) => {
    let file = event.target.files[0];
    setFile(file);
    setSpotImage(false);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    spot.seatsRemaining = spot.seats;
    event.preventDefault();
    try {
      await spotStore
        .createSpot(spot, categoryId, file)
        .swal({
          title: "Success",
          text: `${spot.name} has been added`,
          icon: "success",
          confirmButtonText: "OK",
        })
        .then(async function () {
          await authStore.updateNumofDests();
          nav(`/my-spots`);
        });
    } catch (e) {
      alert(e.message);
      //updateOrganizer.numofDests = updateOrganizer.numofDests - 1;
      //await authStore.updateOrganizer(updateOrganizer);
    }
  };
  // ADD input type email for email
  // ADD input type date for date
  // ADD input time date for startTime

  return (
    <div className="backgroundform">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1 className="dash">Create A Dest</h1>
        </div>
        {authStore.organizer.numofDests === 0 ? (
          <div className="whitebackgroundcreate">
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Spot Name (in English)</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  className="input-style"
                  type="text"
                  multiple
                  placeholder="Spot Name in English"
                  name="name"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Spot Name (in Arabic)</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  className="input-style"
                  type="text"
                  multiple
                  placeholder="Spot Name in Arabic"
                  name="nameAr"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Location URL</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  className="input-style"
                  type="text"
                  placeholder="Location URL"
                  name="location"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">
                    Enter Spot Description in English (200 characters max)
                  </h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <textarea
                  cols="40"
                  rows="5"
                  style={{
                    height: "100px",
                    paddingTop: "10px",
                  }}
                  className="input-style"
                  type="text"
                  placeholder="Spot Description in English"
                  name="description"
                  maxLength={200}
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">
                    Enter Spot Description in Arabic (200 characters max)
                  </h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <textarea
                  cols="40"
                  rows="5"
                  style={{
                    height: "100px",
                    paddingTop: "10px",
                  }}
                  className="input-style"
                  type="text"
                  placeholder="Spot Description in Arabic"
                  name="descriptionAr"
                  maxLength={200}
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Spot Detail (in English)</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <textarea
                  cols="40"
                  rows="5"
                  style={{
                    height: "150px",
                    paddingTop: "10px",
                  }}
                  className="input-style"
                  type="text"
                  placeholder="Spot Details in English"
                  name="details"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Spot Details (in Arabic)</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <textarea
                  cols="40"
                  rows="5"
                  style={{
                    height: "150px",
                    paddingTop: "10px",
                    textAlign: "right",
                  }}
                  className="input-style"
                  type="text"
                  placeholder="Spot Details in Arabic"
                  name="detailsAr"
                  onChange={handleChange}
                />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Start Time</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  className="input-style"
                  type="time"
                  placeholder="Time"
                  name="startTime"
                  onChange={handleChange}
                />
                <div>
                  <h5 className="l-color">Add End Time?</h5>
                  <input
                    type="radio"
                    id="timeEnd"
                    name="spotEndTime"
                    className="radio"
                    onChange={() => setAddEndTimeRadio(true)}
                  />
                  <label className="radiotext" for="timeEnd">
                    Yes
                  </label>
                  <input
                    type="radio"
                    id="timeEnd"
                    name="spotEndTime"
                    className="radio"
                    onChange={() => setAddEndTimeRadio(false)}
                  />
                  <label for="timeEnd">No</label>
                  {addEndTimeRadio === true ? (
                    <>
                      <h5 className="l-color">Enter End Time</h5>
                      <input
                        className="input-style"
                        type="time"
                        placeholder="Time"
                        name="endTime"
                        onChange={handleChange}
                      />
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Enter Date</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <input
                  className="input-style"
                  type="date"
                  placeholder="Date"
                  name="startDate"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h5 className="l-color">Is the Dest free to Enter?</h5>
                <input
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
                  type="radio"
                  id="payment"
                  name="isFree"
                  className="radio"
                  onChange={handlePaid}
                />
                <label for="payment">No</label>
                {spot.isFree === false ? (
                  <div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h5 className="l-color">Enter Total Number of Tickets</h5>
                      <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                    </div>
                    <input
                      className="input-style"
                      type="number"
                      placeholder="Number of Tickets"
                      name="seats"
                      onChange={handleChange}
                    />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <h5 className="l-color">Enter Price Per Ticket</h5>
                      <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                    </div>
                    <input
                      className="input-style"
                      type="number"
                      placeholder="Price Per Ticket"
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <h5 className="l-color">Upload an Image</h5>
                  <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                </div>
                <h5 className="l-color-tiny-image">
                  This is how your image will look like on the user's screen
                </h5>
                <div className="spotimagecontainer">
                  {image ? (
                    <img alt={image} className="spotimage" src={image}></img>
                  ) : (
                    <label className="spotimagetext">
                      Your Dest image goes here
                    </label>
                  )}
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

                  {spot.isFree === true ? (
                    <>
                      {spotName === false &&
                      spotNameAr === false &&
                      spotImage === false &&
                      spotLocation === false &&
                      spotDescription === false &&
                      spotDescriptionAr === false &&
                      spotDetails === false &&
                      startTime === false &&
                      spotDetailsAr === false &&
                      spotStartDate === false ? (
                        <input
                          className="button-sign ing-create"
                          type="submit"
                          value="Create Spot"
                        />
                      ) : (
                        <input
                          className="button-signx ing-create"
                          type="submit"
                          disabled
                          value="Create Spot"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      {spotName === false &&
                      spotNameAr === false &&
                      spotImage === false &&
                      spotLocation === false &&
                      spotDescription === false &&
                      spotDetails === false &&
                      spotStartDate === false &&
                      spotSeats === false &&
                      startTime === false &&
                      spotPrice === false ? (
                        <input
                          className="button-sign ing-create"
                          type="submit"
                          value="Create Spot"
                        />
                      ) : (
                        <input
                          className="button-signx ing-create"
                          type="submit"
                          disabled
                          value="Create Spot"
                        />
                      )}
                    </>
                  )}

                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <h5 className="l-color-tiny-image">(Feilds with</h5>
                    <h5 style={{ color: "red" }}>*</h5>
                    <h5 className="l-color-tiny-image">are reqiured)</h5>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="whitebackgroundcreateoff">
            <h1 className="codelabel">You Don't have any Dest Credits</h1>
            <h1 className="codelabelsecond">
              To get more Dest Credits, contact us in WhatsApp at 99440289
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateSpot;
