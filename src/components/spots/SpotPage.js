import { observer } from "mobx-react";
import { useParams } from "react-router";
import spotStore from "../../stores/spotStore";
import ReviewList from "../review/ReviewList";
import { baseURL } from "../../stores/instance";
import { useNavigate } from "react-router-dom";

function SpotPage() {
    const nav = useNavigate();
  const { spotId } = useParams();
  const spot = spotStore?.getSpotsById(spotId);
//   console.log("spot: "+JSON.stringify(spot));
//   const foundCategory = categoriesStore.categories.find(
//     (category) => recipe.Category === category._id
//   );
  return (
    <div className="center">
      <div className="singlecontainer">
        <div className="singlerecipetitles">
          <h1 className="singlerecipename">{spot?.name}</h1>
          <button className="singlecategoryname" onClick={() => (nav(`/Edit/${spotId}`))}>Edit Spot</button>
        </div>
        <img src={`${baseURL}${spot?.image}`} className="singlerecipeimage"></img>
        <h1 className="instructionstitle">Description</h1>
        <p className="singlerecipeinstruction">{spot?.description}</p>
        <h1 className="instructionstitle">Details</h1>
        <p className="singlerecipeinstruction">{spot?.details}</p>
        <h1 className="instructionstitle">Location</h1>
        <a className="singlerecipeinstruction" href={spot?.location} target="_blank" >Spot Location</a>
        <h1 className="instructionstitle">Days Live</h1>
        {spot?.numOfDays > 1 ? 
            <p className="singlerecipeinstruction">{spot?.numOfDays} Days</p> 
        : 
        <>
            <p className="singlerecipeinstruction">{spot?.numOfDays} Day</p>
        </>
        }
        <h1 className="instructionstitle">Start Time</h1>
        <p className="singlerecipeinstruction">{spot?.startTime}</p>
        <h1 className="instructionstitle">Start Date</h1>
        <p className="singlerecipeinstruction">{spot?.startDate}</p>
        <h1 className="instructionstitle">End Date</h1>
        <p className="singlerecipeinstruction">{spot?.endDate}</p>
        <h1 className="instructionstitle">Event Entry</h1>
        {spot?.isFree === true ? 
            <p className="singlerecipeinstruction">Free</p> 
        : 
        <>
            <p className="singlerecipeinstruction">{spot?.price}kd per person</p>
            <h1 className="instructionstitle">Seats</h1>
            <p className="singlerecipeinstruction">{spot?.seats}</p>
            <h1 className="instructionstitle">Spot Revinew</h1>
            <p className="singlerecipeinstruction">{spot?.price * spot?.seats}</p>
        </>
        }
        <h1 className="instructionstitle">Spotted Me</h1>
        <p className="singlerecipeinstruction">{spot?.users?.length}</p>
        {spot?.reviews.length !== 0 ? 
            <ReviewList reviews={spot?.reviews}/>
            :
            <h1 className="instructionstitle center" >No Reviews Yet</h1>
        }
        
      </div>
    </div>
  );
}

export default observer(SpotPage);
