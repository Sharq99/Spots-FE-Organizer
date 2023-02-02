import { observer } from "mobx-react";
import SpotList from "./spots/SpotList";

function MySpots() {
  return (
    <div className="whitebackgroundoffers">
      <h1 style={{ alignSelf: "center" }} className="dash">
        My Dests
      </h1>
      <SpotList />
    </div>
  );
}

export default observer(MySpots);
