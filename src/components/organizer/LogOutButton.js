import authStore from '../../stores/authStore';
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

  return (
    <button className="button-7" onClick={handleSignOut}>
      Logout
    </button>
  );
}

export default LogOutButton;