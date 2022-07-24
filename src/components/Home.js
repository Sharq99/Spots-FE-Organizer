import { observer } from "mobx-react";
import RegisterModal from "./organizer/RegisterModal";
import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";
import Dashborad from "./Dashborad";

function Home() {
  return (
    <div>
      {authStore.organizer ? (
        <div className="dashback">
          <Dashborad />
        </div>
      ) : (
        <>
          <div className="welcomeformrow">
            <h1 className="Welcome">
              Welcome to Spots, Your most modern events app in Kuwait
            </h1>
            <RegisterModal />
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Home);
