import { observer } from "mobx-react";
import RegisterModal from "./organizer/RegisterModal";
import authStore from "../stores/authStore";
import Dashborad from "./Dashborad";
import ApllicationList from "./ApplicationManagement/AppllicationList";
import DestExplain from "./Reception/DestExplain";
import Screenshots from "./Reception/Screenshots";
import Footer from "./Reception/Footer";

function Home() {
  const { organizer } = authStore;
  return (
    <>
      {organizer && (
        <>
          {organizer.email === process.env.REACT_APP_DEST_KEY_ADMN ? (
            <ApllicationList />
          ) : (
            <Dashborad />
          )}
        </>
      )}
      {!organizer && (
        <>
          <RegisterModal />
          <Screenshots />
          <DestExplain />
          <Footer />
        </>
      )}
    </>
  );
}

export default observer(Home);
