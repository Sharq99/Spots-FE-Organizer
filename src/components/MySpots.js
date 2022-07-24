import { observer } from "mobx-react";
import SpotList from "./spots/SpotList";

function MySpots() {
  return (
    <div>
      <div className="myspotstext">
        <div className="center">
          <h1 className="dash">My Spots</h1>
        </div>
      </div>
      <div className="whitebackgroundspots">
        <SpotList />
      </div>
    </div>
  );
}

export default observer(MySpots);
