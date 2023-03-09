import { observer } from "mobx-react";
import RegisterModal from "./organizer/RegisterModal";
import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";
import Dashborad from "./Dashborad";
import Ads from "./Advertisment/Ads";
import { DEST_KEY_ADMN } from "../config/keys";
import ApllicationList from "./ApplicationManagement/AppllicationList";

function Home() {
  const { organizer } = authStore;
  return (
    <>
      {organizer && (
        <>
          {organizer.email === DEST_KEY_ADMN ? (
            <ApllicationList />
          ) : (
            <Dashborad />
          )}
        </>
      )}
      {!organizer && <RegisterModal />}
    </>
  );
}

export default observer(Home);
