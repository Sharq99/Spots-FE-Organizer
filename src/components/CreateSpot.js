import { observer } from "mobx-react";
import { useState } from "react";
import CategoryList from "./category/CategoryList";
import spotStore from "../stores/spotStore";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

function CreateSpot() {
  const nav = useNavigate();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [spot, setSpot] = useState({
    name: "",
    image: "",
    video: "",
    location: "",
    description: "",
    details: "",
    startTime: "",
    isFree: true,
    // spotDate: {
    //     year: "",
    //     month: "",
    //     day: ""
    // },
    startDate: 0,
    endDate: 0,
    seats: 0,
    addSeats: 0,
    price: 0,
    days: [],
    numOfDays: 1,
    spotRevenue: 0,
  });
  const [categoryId, setCategoryId] = useState("62d828fff35c707fdaa7422c");
  const [categoryName, setCategoryName] = useState();

  const handleChange = (event) => {
    setSpot({ ...spot, [event.target.name]: event.target.value });
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
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await spotStore.createSpot(spot, categoryId, file);
      swal({
        title: "Success",
        text: `${spot.name} has been added`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        nav("/QrCode");
      });
    } catch (e) {
      alert(e.message);
    }
  };

  // ADD input type email for email
  // ADD input type date for date
  // ADD input time date for startTime

  return (
    <div className="backgroundform">
      <div className="whitebackground">
        <div className="center">
          <h1 className="dash">Create A Spot</h1>
        </div>

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
              <h5 className="l-color">Enter Spot Name</h5>
              <input
                className="input-style"
                type="text"
                multiple
                placeholder="Spot Name"
                name="name"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Location URL</h5>
              <input
                className="input-style"
                type="text"
                placeholder="Location URL"
                name="location"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Spot Description</h5>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "200px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
                placeholder="Spot Description"
                name="description"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Spot Details</h5>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "150px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
                placeholder="Spot Details"
                name="details"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Time</h5>
              <input
                className="input-style"
                type="time"
                placeholder="Time"
                name="startTime"
                onChange={handleChange}
              />
              <h5 className="l-color">Enter Date</h5>
              <input
                className="input-style"
                type="date"
                placeholder="Date"
                name="startDate"
                onChange={handleChange}
              />
            </div>
            <div>
              <h5 className="l-color">Is the Spot free to Enter?</h5>
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
                  <h5 className="l-color">Enter Total Number of Tickets</h5>
                  <input
                    className="input-style"
                    type="number"
                    placeholder="Number of Tickets"
                    name="seats"
                    onChange={handleChange}
                  />
                  <h5 className="l-color">Enter Price Per Ticket</h5>
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
              <h5 className="l-color">Upload an Image</h5>
              <h5 className="l-color-tiny">
                This is how your image will look like on the user's screen
              </h5>
              <div className="spotimagecontainer">
                {image ? (
                  <img className="spotimage" src={image}></img>
                ) : (
                  <label className="spotimagetext">
                    Your spot image goes here
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

                <input
                  className="button-sign ing-create"
                  type="submit"
                  value="Create Spot"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSpot;
