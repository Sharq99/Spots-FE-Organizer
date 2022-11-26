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

function App() {
  return (
    <div className="appdiv">
      <Nav />
      <Routes>
        {authStore.organizer?.username === "Melenzani" ? (
          <Route path="/" element={<Ads />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<LogInModal />} />
        <Route path="/create-spot" element={<CreateSpot />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-spots" element={<MySpots />} />
        <Route path="/spot/:spotId" element={<SpotPage />} />
        <Route path="/Edit/:spotId" element={<EditSpot />} />
        <Route path="/ExperianceList/:spotId" element={<ExperianceList />} />
        <Route path="/Experience/:spotId" element={<Experience />} />
        <Route
          path="/RewardExperience/:spotId"
          element={<RewardExperience />}
        />
        <Route path="/Ads" element={<Ads />} />
      </Routes>
    </div>
  );
}
export default App;
