import { observer } from "mobx-react";
import authStore from "../../stores/authStore";
import spotStore from "../../stores/spotStore";
import SpotItem from "./SpotItem";
import { useState } from "react";

function SpotList() {
  const [isActive, setIsActive] = useState(false);

  const toggleCollapsible = () => {
    setIsActive(!isActive);
  };

  const spotList = spotStore.spots
    ?.filter(
      (spot) =>
        spot.organizer == authStore.organizer.id &&
        (new Date(spot.startDate) >= new Date() ||
          new Date(spot.endDate) >= new Date())
    )
    .map((spot) => <SpotItem key={spot?._id} spot={spot} />);
  const spotListFinished = spotStore.spots
    ?.filter(
      (spot) =>
        spot.organizer == authStore.organizer.id &&
        (new Date(spot.startDate) < new Date() ||
          new Date(spot.endDate) < new Date())
    )
    .map((spot) => <SpotItem key={spot?._id} spot={spot} />)
    .reverse();
  return spotList.length > 0 ? (
    <div>
      <div className="categoriescarousel">{spotList}</div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: 20,
        }}
      >
        <h1
          style={{
            color: "rgb(0,0,0,0.5)",
            alignSelf: "center",
          }}
          className="dash"
        >
          Finished Dests
        </h1>
        {isActive !== true ? (
          <button
            style={{
              alignSelf: "center",
            }}
            className={`collapsible ${isActive ? "active" : ""}`}
            onClick={() => toggleCollapsible()}
          >
            Show
          </button>
        ) : (
          <button
            style={{
              alignSelf: "center",
            }}
            className={`collapsible ${isActive ? "active" : ""}`}
            onClick={() => toggleCollapsible()}
          >
            Hide
          </button>
        )}
      </div>
      {isActive === true && (
        <div className="categoriescarousel">{spotListFinished}</div>
      )}
    </div>
  ) : (
    <div className="whitebackgroundcreateoffmy">
      <h3 className="codedest">No Dests Yet!</h3>
    </div>
  );
}

export default observer(SpotList);
