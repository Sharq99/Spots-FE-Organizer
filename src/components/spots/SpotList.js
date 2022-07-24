import { observer } from "mobx-react";
import authStore from "../../stores/authStore";
import spotStore from "../../stores/spotStore";
import SpotItem from "./SpotItem";

function SpotList() {
  const spotList = spotStore.spots
    ?.filter((spot) => spot.organizer == authStore.organizer.id)
    .map((spot) => <SpotItem key={spot?._id} spot={spot} />);

  return <div className="categoriescarousel">{spotList}</div>;
}

export default observer(SpotList);
