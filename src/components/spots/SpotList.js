import { observer } from "mobx-react";
import { useParams } from "react-router";
import authStore from "../../stores/authStore";
import spotStore from "../../stores/spotStore";
import SpotItem from "./SpotItem";

function SpotList() {
    const spotList = authStore.organizer.spots.map(spotID => spotStore.spots.find(spot => spotID === spot._id));
  const OrganizerSpots = spotList?.map((spot) => (
    <SpotItem key={spot._id} spot={spot} />
  ));

  return (
    <div className="center">
      <div className="container" style={{ width: "70%" }}>
        <div className="categorycontainer">
          <h1 className="categorytitle">Your Spots</h1>
          <div className="categoriescarousel">{OrganizerSpots}</div>
        </div>
      </div>
    </div>
  );
}

export default observer(SpotList);
