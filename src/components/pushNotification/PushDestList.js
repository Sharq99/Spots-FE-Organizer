import { observer } from "mobx-react";
import { useState } from "react";
import spotStore from "../../stores/spotStore";
import PushDestItem from "./PushDestItem";

function PushDestList({ setSpotId, spotId }) {
  const [query, setQuery] = useState("");
  const today = new Date();
  today.setHours(3, 0, 0, 0);
  const spotList = spotStore.spots
    .filter((spot) => spot?.name.toLowerCase().includes(query?.toLowerCase()))
    .filter((spot) => new Date(spot.startDate) >= today && spot.isAd !== true)
    .map((spot) => (
      <PushDestItem
        key={spot?._id}
        spot={spot}
        setSpotId={setSpotId}
        spotId={spotId}
      />
    ));
  return (
    <div style={{ width: "100%", marginLeft: 20 }} className="adlist">
      <h1 className="adtitlebig">Link Dest</h1>
      <input
        className="searchad"
        placeholder="Search Spot"
        onChange={(event) => setQuery(event.target.value)}
      ></input>
      <div>{spotList}</div>
    </div>
  );
}

export default observer(PushDestList);
