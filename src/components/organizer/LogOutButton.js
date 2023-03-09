import authStore from "../../stores/authStore";
import { useNavigate } from "react-router-dom";

function LogOutButton() {
  const nav = useNavigate();
  const handleSignOut = async () => {
    try {
      await authStore.logout();
      nav("/Home");
    } catch (e) {
      alert(e.message);
    }
  };

  const location = window.location.href

  return (
    <>{location.includes("settings") ? (<>
      <button className="settingsbuttons" onClick={handleSignOut}>
        Logout
      </button>
    </>) : (<>
      <button className="logoutbutton" onClick={handleSignOut}>
        Logout
      </button>
    </>)
    }</>
  );
}

export default LogOutButton;
