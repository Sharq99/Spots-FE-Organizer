import { observer } from "mobx-react";
import SpotList from "./spots/SpotList";

function MySpots() {
  return (
    <div>
      <div className="whitebackgroundspots">
        <h1 className="dash">My Spots</h1>
        <SpotList />
      </div>
    </div>
  );
}

export default observer(MySpots);
