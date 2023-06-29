import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav";
import LogInModal from "./components/organizer/LogInModal";
import Home from "./components/Home";
import CreateSpot from "./components/CreateDest/CreateSpot";
import Settings from "./components/Settings";
import MySpots from "./components/MySpots";
import SpotPage from "./components/spots/SpotPage";
import EditSpot from "./components/EditSpot";
import ExperianceList from "./components/spots/ExperianceList";
import Experience from "./components/offer/Experience";
import RewardExperience from "./components/reward/RewardExperience";
import authStore from "./stores/authStore";
import Ads from "./components/Advertisment/Ads";
import ApllicationList from "./components/ApplicationManagement/AppllicationList";
import ActiveOrganizersList from "./components/ApplicationManagement/ActiveOrganizersList";
import { Helmet } from "react-helmet";
import OrderHistory from "./components/spots/OrderHistory";
import PushNotification from "./components/pushNotification/PushNotification";
import PushNotificationHistory from "./components/pushNotification/PushNotificationHistory";
import ManageDests from "./components/numberOfDests/ManageDests";
import ForgetOrganizersList from "./components/forgotPassword/ForgetOrganizersList";
import OffersTerms from "./components/offer/OffersTerms";
import RewardssTerms from "./components/reward/RewardsTerms";
import PickDate from "./components/CreateDest/PickDate";
import ReportsList from "./components/report/ReportsList";
import Populars from "./components/popular/Populars";

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
        {authStore.organizer?.email === process.env.REACT_APP_DEST_KEY_ADMN ? (
          <>
            <Route path="/applications" element={<ApllicationList />} />
            <Route path="/populars" element={<Populars />} />
            <Route
              path="/active-organizers"
              element={<ActiveOrganizersList />}
            />
            <Route
              path="/forgot-passwords"
              element={<ForgetOrganizersList />}
            />
            <Route path="/addDests" element={<ManageDests />} />
            <Route path="/Report" element={<ReportsList />} />
            <Route path="/Ads" element={<Ads />} />
            <Route path="/PushNotification" element={<PushNotification />} />
            <Route
              path="/PushNotifications"
              element={<PushNotificationHistory />}
            />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<LogInModal />} />
            <Route path="/Pick-Date" element={<PickDate />} />
            <Route path="/create-spot" element={<CreateSpot />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/my-spots" element={<MySpots />} />
            <Route path="/spot/:spotId" element={<SpotPage />} />
            <Route path="/Edit/:spotId" element={<EditSpot />} />
            <Route
              path="/ExperianceList/:spotId"
              element={<ExperianceList />}
            />
            <Route path="/OrderHistory/:spotId" element={<OrderHistory />} />
            <Route path="/Experience/:spotId" element={<Experience />} />
            <Route path="/OffersTerms/:spotId" element={<OffersTerms />} />
            <Route path="/RewardsTerms/:spotId" element={<RewardssTerms />} />
            <Route
              path="/RewardExperience/:spotId"
              element={<RewardExperience />}
            />
          </>
        )}
      </Routes>
    </div>
  );
}
export default App;
