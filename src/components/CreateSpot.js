import { observer } from "mobx-react";
import { useState } from "react";
import authStore from "../stores/authStore";
import CategoryList from "./category/CategoryList";
import spotStore from "../stores/spotStore"
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function CreateSpot() {
    const nav = useNavigate();
    const cars = ["Saab"];
    // const [sDate, setSpotDate] = useState({
    //     year: "",
    //     month: "",
    //     day: ""
    // });

    const [file, setFile] = useState("");

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
        startDate:0,
        endDate: 0,
        seats: 0,
        addSeats: 0,
        price: 0,
        days:[],
        numOfDays: 1,
        spotRevenue: 0
    });
    const [categoryId, setCategoryId] = useState("62c8960e2b8d6b47ab0b9583");

    const handleChange = (event) =>{
        setSpot({ ...spot, [event.target.name]: event.target.value });
        console.log("spot: "+JSON.stringify(spot));
    }

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

    const handleFree = (event) =>
        setSpot({ ...spot, [event.target.name]: true });

    const handlePaid = (event) =>
        setSpot({ ...spot, [event.target.name]: false });

    const handleImage = (event) => {
        let file = event.target.files[0];
        setFile(file);
    }

  const handleSubmit =  async (event) => {
    event.preventDefault();
    try {
     await spotStore.createSpot(spot, categoryId, file);
     swal({
        title: "Success",
        text: `${spot.name} has been added`,
        icon: "success",
        confirmButtonText: "OK",
      })
      .then(function () {
        nav("/my-spots");
    });
      
    } catch (e) {
      alert(e.message);
    }
  }

// ADD input type email for email
// ADD input type date for date
// ADD input time date for startTime

  return (
    <div>
        <div className="center">
            <h1 className="Welcome">Create A Spot</h1>
        </div>
        <CategoryList setCategoryId={setCategoryId}/>
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    <h5 className="l-color">Enter Spot Name:-</h5>
                    <input
                        className='input-style'
                        type="text"
                        multiple
                        placeholder="Spot Name"
                        name="name"
                        onChange={handleChange}
                    />
                    <h5 className="l-color">Upload an Image:-</h5>
                    <input
                        className='input-style'
                        type="file"
                        placeholder="Image URL"
                        name="image"
                        onChange={handleImage}
                    />
                    <h5 className="l-color">Enter Video URL:-</h5>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Video URL"
                        name="video"
                        onChange={handleChange}
                    />
                    <h5 className="l-color">Enter Location URL:-</h5>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Location URL"
                        name="location"
                        onChange={handleChange}
                    />
                    <h5 className="l-color">Enter Spot Description:-</h5>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Spot Description"
                        name="description"
                        onChange={handleChange}
                    />
                    <h5 className="l-color">Enter Spot Details:-</h5>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Spot Details"
                        name="details"
                        onChange={handleChange}
                    />
                    <h5 className="l-color">Enter Start Time:-</h5>
                    <input
                        className='input-style'
                        type="time"
                        placeholder="Start Time"
                        name="startTime"
                        onChange={handleChange}
                    />
                    <h5 className="l-color">Enter the Spots Total Number oF Days:-</h5>
                    <input
                        className='input-style'
                        type="number"
                        placeholder="Number Of Days"
                        name="numOfDays"
                        onChange={handleChange}
                    />
                    <h5 className="l-color">Enter Start Date:-</h5>
                    <input
                        className='input-style'
                        type="date"
                        placeholder="Start Date"
                        name="startDate"
                        onChange={handleChange}
                    />
                    {/* <h5 className="l-color">Enter Start Date:-</h5>
                    <input
                        className='input-style'
                        type="number"
                        placeholder="Year"
                        name="year"
                        onChange={handleYear}
                    />
                    <input
                        className='input-style'
                        type="number"
                        placeholder="Month"
                        name="month"
                        onChange={handleMonth}
                    />
                    <input
                        className='input-style'
                        type="number"
                        placeholder="Day"
                        name="day"
                        onChange={handleDay}
                    /> */}
                    <h5 className="l-color">Enter End Date:-</h5>
                    <input
                        className='input-style'
                        type="date"
                        placeholder="End Date"
                        name="endDate"
                        onChange={handleChange}
                    />
                    <h5 className="l-color">Is the Spot free to Enter?</h5>
                    <input 
                        type="radio" 
                        id="payment" 
                        name="isFree" 
                        onChange={handleFree}
                    />
                    <label for="payment">yes</label>
                    <input 
                        type="radio" 
                        id="payment" 
                        name="isFree" 
                        onChange={handlePaid}
                    />
                    <label for="payment">no</label>
                    {spot.isFree === false ?
                        <>
                            <h5 className="l-color">Enter Total Number of Seats:-</h5>
                            <input
                            className='input-style'
                            type="number"
                            placeholder="Number of Seats"
                            name="seats"
                            onChange={handleChange}
                            />
                            <h5 className="l-color">Enter Price Per Seat:-</h5>
                            <input
                            className='input-style'
                            type="number"
                            placeholder="Price Per Seat"
                            name="price"
                            onChange={handleChange}
                            />
                        </>
                    :
                    <></>
                    }
                </label>
                    <input
                        className="button-sign ing-create"
                        type="submit"
                        value="Create Spot"
                    />
            </div>
        </form>
    </div>
  );
}

export default CreateSpot;