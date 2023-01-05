import { observer } from "mobx-react";
import RegisterModal from "./organizer/RegisterModal";
import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";
import Dashborad from "./Dashborad";
import Ads from "./Advertisment/Ads";
import { DEST_KEY_ADS, DEST_KEY_U } from "../config/keys";
import ApllicationList from "./ApplicationManagement/AppllicationList";

function Home() {
  return (
    <div>
      {authStore.organizer ? (
        <>
          {authStore.organizer?.email === DEST_KEY_ADS ? (
            <Ads />
          ) : authStore.organizer?.username === DEST_KEY_U ? (
            <ApllicationList />
          ) : (
            <div className="dashback">
              <Dashborad />
            </div>
          )}
        </>
      ) : (
        <>
          <div className="welcomeformrow">
            <RegisterModal />
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Home);
