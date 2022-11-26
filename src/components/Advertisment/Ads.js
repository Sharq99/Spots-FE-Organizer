import { useNavigate } from "react-router-dom";
import AdsList from "../../Ads/AdsList";
import AdSpots from "../../AdSpots/AdSpots";
import authStore from "../../stores/authStore";
function Ads() {
  const nav = useNavigate();
  const handleSignOut = async () => {
    try {
      await authStore.logout();
      nav("/Home");
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div>
      <div className="logoutad">
        <button className="logoutadbutton" onClick={() => handleSignOut()}>
          logout
        </button>
      </div>
      <div className="whitebackgroundad">
        <AdSpots />
        <AdsList />
      </div>
    </div>
  );
}

export default Ads;
