import { observer } from "mobx-react";
import LogOutButton from "./organizer/LogOutButton";
import authStore from "../stores/authStore";
import { baseURL } from "../stores/instance";
import EditOrganizerModal from "./EditOrganizerModal";
import profilePic from "./pics/PP.jpeg"; 
import SettingsModal from "./spots/SettingsModal";

function Settings() {
  return (
    <div className="whitebackgroundprofile">
      {authStore.organizer ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h1 className="username">{authStore.organizer.username}</h1>
            <SettingsModal />
          </div>
          <div className="profileimageusername">
            <div className="imageUserNameEdit center-settings">
              <div className="imageUserName">
                {authStore.organizer.image ? (
                  <img className="profileImage" src={`${baseURL}${authStore.organizer.image}`} alt="Pofile Picture"/>
                ) : (
                  <img className="profileImage" src={profilePic} alt="Pofile Picture"/>
                )}
              </div>
            </div>
          </div>
          <div className="profileinfo">
            <div className="emaildiv">
              <h3 className="profilelabels">Email</h3>
              <h3 className="email">{authStore.organizer.email}</h3>
            </div>
            <div className="phonediv">
              <h3 className="profilelabels">Phone</h3>
              <h3 className="phone">{authStore.organizer.phone}</h3>
            </div>
            <div className="biodiv">
              <h3 className="profilelabels">Bio</h3>
              <h3 className="bio">{authStore.organizer.bio}</h3>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="center">
            <h1 className="Welcome">You Must Be Logged In To View This Page</h1>
          </div>
        </>
      )}
    </div>
  );
}

export default observer(Settings);
