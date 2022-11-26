import { observer } from "mobx-react";
import spotStore from "../stores/spotStore";
import AdItem from "./AdItem";

function AdsList() {
  const today = new Date();
  today.setHours(3, 0, 0, 0);
  const advertisedSpots = spotStore.spots
    .filter((spot) => new Date(spot.startDate) >= today && spot.isAd === true)
    .map((spot) => <AdItem key={spot?._id} spot={spot} />);

  return (
    <div className="adlist">
      <h1 className="adtitlebig">Advertised Spots (5 max)</h1>
      <div>{advertisedSpots}</div>
    </div>
  );
}
export default observer(AdsList);
