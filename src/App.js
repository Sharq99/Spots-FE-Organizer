import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import LogInModal from "./components/organizer/LogInModal";
import Home from "./components/Home";
import CreateSpot from "./components/CreateSpot";
import Settings from "./components/Settings";
import MySpots from "./components/MySpots";
import SpotPage from "./components/spots/SpotPage";
import EditSpot from "./components/EditSpot";
import ExperianceList from "./components/spots/ExperianceList";
import Experience from "./components/offer/Experience";
import RewardExperience from "./components/reward/RewardExperience";
import authStore from "./stores/authStore";
import Ads from "./components/Advertisment/Ads";
import { DEST_KEY_Ads, DEST_KEY_U } from "./config/keys";
import ApllicationList from "./components/ApplicationManagement/AppllicationList";
import ActiveOrganizersList from "./components/ApplicationManagement/ActiveOrganizersList";
import { Helmet } from "react-helmet";

function App() {
  return (
    <div className="appdiv">
      <Nav />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dest</title>
        <link rel="canonical" href="http://destkw.com/" />
        <meta name="description" content="Events App" />
      </Helmet>
      <Routes>
        {authStore.organizer?.username === DEST_KEY_Ads ? (
          <Route path="/" element={<Ads />} />
        ) : authStore.organizer?.username === DEST_KEY_U ? (
          <>
            <Route path="/applications" element={<ApllicationList />} />
            <Route
              path="/active-organizers"
              element={<ActiveOrganizersList />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<LogInModal />} />
            <Route path="/create-spot" element={<CreateSpot />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/my-spots" element={<MySpots />} />
            <Route path="/spot/:spotId" element={<SpotPage />} />
            <Route path="/Edit/:spotId" element={<EditSpot />} />
            <Route
              path="/ExperianceList/:spotId"
              element={<ExperianceList />}
            />
            <Route path="/Experience/:spotId" element={<Experience />} />
            <Route
              path="/RewardExperience/:spotId"
              element={<RewardExperience />}
            />
            <Route path="/Ads" element={<Ads />} />
          </>
        )}
      </Routes>
    </div>
  );
}
export default App;
