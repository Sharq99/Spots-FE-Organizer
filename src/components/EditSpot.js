import { observer } from "mobx-react";
import { useState } from "react";
import authStore from "../stores/authStore";
import CategoryList from "./category/CategoryList";
import spotStore from "../stores/spotStore"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import swal from 'sweetalert';

function EditSpot() {
    const { spotId } = useParams();
    const oldSpot = spotStore?.getSpotsById(spotId);
    const nav = useNavigate();

    const [file, setFile] = useState(oldSpot?.image);

    const [spot, setSpot] = useState(
        {
        // _id: oldSpot?._id,
        name: oldSpot?.name,
        image: oldSpot?.image,
        location: oldSpot?.location,
        description: oldSpot?.description,
        details: oldSpot?.details,
        startTime: oldSpot?.startTime,
        isFree: oldSpot?.isFree,
        startDate: oldSpot?.startDate,
        endDate: oldSpot?.endDate,
        seats: oldSpot?.seats,
        price: oldSpot?.price,
        numOfDays: oldSpot?.numOfDays,
        category: oldSpot?.category,
        addSeats: 0,
        days: oldSpot?.days
    });
    const [categoryId, setCategoryId] = useState(oldSpot.category);

    const handleChange = (event) =>{
        setSpot({ ...spot, [event.target.name]: event.target.value });
        console.log("spot: "+JSON.stringify(spot));
    }

    // const handleDate = (event) =>{
    //     setSpotDate({ ...sDate, [event.target.name]: event.target.value });
    //     console.log("sDate: "+JSON.stringify(sDate));}

    const handleFree = (event) =>
        setSpot({ ...spot, [event.target.name]: true });

    const handlePaid = (event) =>
        setSpot({ ...spot, [event.target.name]: false });

    const handleImage = (event) => {
        let file = event.target.files[0];
        setFile(file);
    }

    const updateSeats = () => {
        if(spot.isFree === false){
            if(spot.numOfDays <= 1){
              spot.seats = spot.seats + parseInt(spot.addSeats);
            } 
            // else{
            //   for (let i = 0; i < spot.numOfDays; i++) {
            //     spot.days[i].seats = spot.days[i].seats + spot.addSeats;
            //   }
            // }
        }
    }
    // console.log(typeof spot.days[1].seats)
  const handleSubmit =  async (event) => {
    event.preventDefault();
    updateSeats();
    try {
     await spotStore.updateSpot(spot, spotId, file, categoryId);
     swal({
        title: "Success",
        text: `${spot.name} has been Updated`,
        icon: "success",
        confirmButtonText: "OK",
      })
      .then(function () {
        nav(`/spot/${spotId}`);
    }); 
    // window.location = `/RecipePage/${recipeid}`;
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div>
        <div className="center">
            <h1 className="Welcome">Update Spot</h1>
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
                    {/* <h5 className="l-color">Enter the Spots Total Number oF Days:-</h5>
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
                    /> */}
                    {/* <h5 className="l-color">Enter Start Date:-</h5>
                    <input
                        className='input-style'
                        type="number"
                        placeholder="Year"
                        name="year"
                        onChange={handleDate}
                    />
                    <input
                        className='input-style'
                        type="number"
                        placeholder="Month"
                        name="month"
                        onChange={handleDate}
                    />
                    <input
                        className='input-style'
                        type="number"
                        placeholder="Day"
                        name="day"
                        onChange={handleDate}
                    /> */}
                    {/* <h5 className="l-color">Enter End Date:-</h5>
                    <input
                        className='input-style'
                        type="date"
                        placeholder="End Date"
                        name="endDate"
                        onChange={handleChange}
                    /> */}
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
                        {spot.numOfDays > 1 ? 
                            <>
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
                            <>
                                <h5 className="l-color">Enter the Number of Added Seats:-</h5>
                                <input
                                className='input-style'
                                type="number"
                                placeholder="Number of Added Seats"
                                name="addSeats"
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
                    }
                        </>
                    :
                    <></>
                    }
                </label>
                    <input
                        className="button-sign ing-create"
                        type="submit"
                        value="Update Spot"
                    />
                    <button className="button-sign ing-create" onClick={() => (nav(`/spot/${spotId}`))}>Cancel</button>
            </div>
        </form>
    </div>
  );
}

export default EditSpot;