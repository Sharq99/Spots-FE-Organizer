import { observer } from "mobx-react";
import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";
import {
  IoIosFiling,
  IoIosPin,
  IoIosCash,
  IoMdStar,
  IoIosStats,
} from "react-icons/io";

function Dashborad() {
  let totalUsers = 0;
  let totalRevenue = 0;
  const orgainizerSpots = spotStore.spots?.filter(
    (spot) => spot.organizer == authStore.organizer.id
  );
  const freeSpots = orgainizerSpots?.filter((spot) => spot?.isFree === true);
  const paidSpots = orgainizerSpots?.filter((spot) => spot?.isFree === false);
  orgainizerSpots?.forEach((spot) => {
    return (totalUsers = totalUsers + spot?.users?.length);
  });
  orgainizerSpots?.forEach((spot) => {
    return (totalRevenue = totalRevenue + spot?.spotRevenue);
  });

  return (
    <div>
      <div className="center">
        <h1 className="dash">Dashboard</h1>
      </div>
      <div className="whitebackgrounddash">
        <div className="dashcard">
          <IoIosFiling
            className="dashicon"
            name="stats-chart-outline"
          ></IoIosFiling>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="cardnum">{orgainizerSpots?.length}</h1>
            <h6 className="cardtitle">Total Spots created</h6>
          </div>
        </div>
        <div className="dashcard">
          <IoMdStar className="dashicon" name="stats-chart-outline"></IoMdStar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="cardnum">{totalUsers}</h1>
            <h6 className="cardtitle">Users Spotted Me</h6>
          </div>
        </div>
        <div className="dashcard">
          <IoIosStats
            className="dashicon"
            name="stats-chart-outline"
          ></IoIosStats>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="cardnum">{totalRevenue}</h1>
            <h6 className="cardtitle">Total Revenue</h6>
          </div>
        </div>
        <div className="dashcard">
          <IoIosPin className="dashicon" name="stats-chart-outline"></IoIosPin>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="cardnum">{freeSpots?.length}</h1>
            <h6 className="cardtitle">Total free spots</h6>
          </div>
        </div>
        <div className="dashcard">
          <IoIosCash
            className="dashicon"
            name="stats-chart-outline"
          ></IoIosCash>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h1 className="cardnum">{paidSpots?.length}</h1>
            <h6 className="cardtitle">Total Paid spots</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashborad;
