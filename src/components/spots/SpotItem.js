import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { baseURL } from "../../stores/instance";

function SpotItem({ spot }) {
    console.log(spot.image)
  return (
      <div className="recipecontainer">
        <div className="recipeimagediv">
          <img className="recipeimage" src={`${baseURL}${spot.image}`}></img>
        </div>
        <div className="recipename">
          <h5>{spot.name}</h5>
        </div>
      </div>
  );
}

export default observer(SpotItem);
