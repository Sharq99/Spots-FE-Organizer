import { observer } from "mobx-react";
import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";

function Dashborad() {
  console.log("organizer: "+JSON.stringify(authStore.organizer));
    let totalUsers = 0;
    let totalRevenue = 0;
    const orgainizerSpots = authStore?.organizer?.spots?.map(spotID => spotStore.spots.find(spot => spotID === spot?._id));
    const freeSpots = orgainizerSpots?.filter(spot => spot?.isFree === true);
    const paidSpots = orgainizerSpots?.filter(spot => spot?.isFree === false);
    orgainizerSpots?.forEach(spot => {
      return totalUsers = totalUsers + spot?.users?.length;
    }); 
    orgainizerSpots?.forEach(spot => {
      return totalRevenue = totalRevenue + (spot?.price * spot?.seats);
    });

  return (
    <div>
                <div className="center">
                  <h1 className="Welcome">Welcome to Your Dashboard</h1>
                </div>
                <h1 className="profile center-settings">{orgainizerSpots?.length}</h1>
                <h3 className="bio center-settings">Total Spots</h3>
                <h1 className="profile center-settings">{totalUsers}</h1>
                <h3 className="bio center-settings">Users Spotted Me</h3>
                <h1 className="profile center-settings">{totalRevenue}</h1>
                <h3 className="bio center-settings">Total Revenue</h3>
                <h1 className="profile center-settings">{freeSpots?.length}</h1>
                <h3 className="bio center-settings">Total free spots</h3>
                <h1 className="profile center-settings">{paidSpots?.length}</h1>
                <h3 className="bio center-settings">Total Paid spots</h3>
    </div>
  );
}

export default Dashborad;
