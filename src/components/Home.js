import { observer } from "mobx-react";
import RegisterModal from "./organizer/RegisterModal";
import authStore from "../stores/authStore";

function Home() {

  return (
    <div>
      {authStore.organizer ? (
              <>
                <div className="center">
                  <h1 className="Welcome">Welcome to Your Dashboard</h1>
                </div>
              </>
            ) : (
              <>
                <div className="center">
                  <h1 className="Welcome">Welcome to Spots</h1>
                  <RegisterModal/>
                </div>
              </>
            )}
    </div>
  );
}

export default observer(Home);
