import { observer } from "mobx-react";
import { useState } from "react";
import authStore from "../stores/authStore";
import CategoryList from "./category/CategoryList";
import spotStore from "../stores/spotStore";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import swal from "sweetalert";
import { baseURL } from "../stores/instance";

function EditSpot() {
  const { spotId } = useParams();
  const oldSpot = spotStore?.getSpotsById(spotId);
  const nav = useNavigate();
  const [image, setImage] = useState("");
  const [file, setFile] = useState(oldSpot?.image);
  const [spot, setSpot] = useState({
    name: oldSpot?.name,
    nameAr: oldSpot?.nameAr,
    image: oldSpot?.image,
    location: oldSpot?.location,
    description: oldSpot?.description,
    descriptionAr: oldSpot?.descriptionAr,
    details: oldSpot?.details,
    detailsAr: oldSpot?.detailsAr,
    startTime: oldSpot?.startTime,
    endTime: oldSpot?.endTime,
    isFree: oldSpot?.isFree,
    startDate: oldSpot?.startDate,
    endDate: oldSpot?.endDate,
    seats: oldSpot?.seats,
    seatsRemaining: oldSpot?.seatsRemaining,
    price: oldSpot?.price,
    isAd: oldSpot?.isAd,
    category: oldSpot?.category,
    addSeats: 0,
    announcement: oldSpot?.announcement,
  });
  const [categoryId, setCategoryId] = useState(oldSpot.category);
  const [categoryName, setCategoryName] = useState();

  const handleChange = (event) => {
    setSpot({ ...spot, [event.target.name]: event.target.value });
  };
console.log('spot.endTime', spot.endTime)
  // const handleDate = (event) =>{
  //     setSpotDate({ ...sDate, [event.target.name]: event.target.value });
  //     console.log("sDate: "+JSON.stringify(sDate));}

  const handleFree = (event) => setSpot({ ...spot, [event.target.name]: true });

  const handlePaid = (event) =>
    setSpot({ ...spot, [event.target.name]: false });

  const handleImage = (event) => {
    let file = event.target.files[0];
    setFile(file);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
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
      await spotStore.updateSpot(spot, spotId, file, categoryId);
      swal({
        title: "Success",
        text: `${spot.name} has been Updated`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        nav(`/spot/${spotId}`);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="backgroundform">
      <div className="whitebackgroundoffers" style={{ height: "250%" }}>
        <div className="center">
          <h1 className="dash">Update Dest</h1>
        </div>

        <div style={{ height: "200%" }} className="whitebackgroundcreate">
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
                className="input-style"
                type="text"
                value={spot.descriptionAr}
                name="descriptionAr"
                maxLength={200}
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Dest Details (English)</h5>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "150px",
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
                  height: "150px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
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
              {(spot.endTime === "") || (spot.endTime === null) ?  ( 
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
                  )
              }
              <h5 className="l-color">Enter Date</h5>
              <input
                className="input-style"
                type="date"
                value={spot.startDate}
                name="startDate"
                onChange={handleChange}
              />
            </div>
            <div>
              <h5 className="l-color">Is the Dest free to Enter?</h5>
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
              )}
              <h5 className="l-color">Upload an Image</h5>
              <h5 className="l-color-tiny">
                This is how your image will look like on the user's screen
              </h5>
              <div className="spotimagecontainer">
                <img
                  className="spotimage"
                  src={image ? image : `${baseURL}${spot.image}`}
                ></img>
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

                <input
                  className="button-sign ing-create"
                  type="submit"
                  value="Update Spot"
                />
                <button
                  className="button-sign ing-create"
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
