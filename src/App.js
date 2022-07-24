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
import Experiance from "./components/spots/Experiance";
import CreateOffer from "./components/offer/CreatOffer";
import QrCode from "./qrCode";

function App() {
  return (
    <div className="appdiv">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<LogInModal />} />
        <Route path="/create-spot" element={<CreateSpot />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/my-spots" element={<MySpots />} />
        <Route path="/spot/:spotId" element={<SpotPage />} />
        <Route path="/Edit/:spotId" element={<EditSpot />} />
        <Route path="/Experiance/:spotId" element={<Experiance />} />
        <Route path="/create-offer/:spotId" element={<CreateOffer />} />
        <Route path="/QrCode" element={<QrCode />} />
      </Routes>
    </div>
  );
}
export default App;
