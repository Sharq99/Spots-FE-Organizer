import { observer } from "mobx-react";
import RegisterModal from "./organizer/RegisterModal";
import authStore from "../stores/authStore";
import spotStore from "../stores/spotStore";
import Dashborad from "./Dashborad";

function Home() {
  return (
    <div>
      {authStore.organizer ? (
              <>
                <Dashborad/>
              </>
            ) : (
              <>
                <div className="center">
                  <h1 className="Welcome">Welcome to Spots</h1>
                  <RegisterModal/>
                </div>
              </>
            )
      }
    </div>
  );
}

export default observer(Home);
