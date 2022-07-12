import { observer } from "mobx-react";
import authStore from "../stores/authStore";
import SpotList from "./spots/SpotList";

function MySpots() {
// console.log("AB spots: "+authStore.organizer.spots)
  return (
    <div>
        <div className="center">
            <h1 className="Welcome">Organizer's List</h1>
        </div>
        <SpotList/>
    </div>
  );
}

export default observer(MySpots);
