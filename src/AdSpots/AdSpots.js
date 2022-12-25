import { observer } from "mobx-react";
import { useState } from "react";
import spotStore from "../stores/spotStore";
import AdSpotsItem from "./AdSpotsItems";

function AdSpots() {
  const [query, setQuery] = useState("");
  const today = new Date();
  today.setHours(3, 0, 0, 0);
  const spotList = spotStore.spots
    .filter((spot) => spot?.name.toLowerCase().includes(query?.toLowerCase()))
    .filter((spot) => new Date(spot.startDate) >= today && spot.isAd !== true)
    .map((spot) => <AdSpotsItem key={spot?._id} spot={spot} />);
  //console.log(spotList);
  return (
    <div className="adlist">
      <h1 className="adtitlebig">All Spots</h1>
      <input
        className="searchad"
        placeholder="Search Spot"
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <div>{spotList}</div>
    </div>
  );
}

export default observer(AdSpots);
