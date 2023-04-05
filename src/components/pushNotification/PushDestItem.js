import { observer } from "mobx-react";
import spotStore from "../../stores/spotStore";
import { baseURL } from "../../stores/instance";

function PushDestItem({ spot, setSpotId, spotId }) {
  const today = new Date();
  today.setHours(3, 0, 0, 0);
  return (
    <div className="aditem">
      <img className="adimage" src={baseURL + spot.image}></img>
      <h1 className="adtitle">{spot.name}</h1>
      {spotId === spot._id ? (
        <button
          onClick={() => setSpotId("")}
          style={{ color: "green", borderColor: "green" }}
          className="adbutton"
        >
          Unlink
        </button>
      ) : spotId === "" ? (
        <button onClick={() => setSpotId(spot._id)} className="adbutton">
          Link
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default observer(PushDestItem);
