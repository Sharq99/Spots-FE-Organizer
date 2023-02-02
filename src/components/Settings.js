import { observer } from "mobx-react";
import authStore from "../stores/authStore";
import { baseURL } from "../stores/instance";
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
                  <img
                    className="profileImage"
                    src={`${baseURL}${authStore.organizer.image}`}
                    alt="Pofile Picture"
                  />
                ) : (
                  <img
                    className="profileImage"
                    src={profilePic}
                    alt="Pofile Picture"
                  />
                )}
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: "28px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                alignSelf: "center",
                display: "flex",
                flexDirection: "row",
                width: "60%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                marginTop: 30,

                borderRadius: 30,
                padding: 30,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "50%",
                  alignContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <h3 className="profilelabels">Name in Arabic</h3>
                {authStore.organizer.displayNameAr ? (
                  <h3 className="email">{authStore.organizer.displayNameAr}</h3>
                ) : (
                  <h3 className="emailnot">Not set yet!</h3>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "50%",
                  alignContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <h3 className="profilelabels">Name in English</h3>
                {authStore.organizer.displayNameEn ? (
                  <h3 className="email">{authStore.organizer.displayNameEn}</h3>
                ) : (
                  <h3 className="emailnot">Not set yet!</h3>
                )}
              </div>
            </div>

            <div
              style={{
                alignSelf: "center",
                display: "flex",
                flexDirection: "row",
                width: "60%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                marginTop: 30,
                borderRadius: 30,
                padding: 30,
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "50%",
                  alignContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <h3 className="profilelabels">Email</h3>
                <h3 className="email">{authStore.organizer.email}</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "50%",
                  alignContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <h3 className="profilelabels">Phone</h3>
                <h3 className="email">{authStore.organizer.phone}</h3>
              </div>
            </div>
            <div
              style={{
                alignSelf: "center",
                display: "flex",
                flexDirection: "column",
                width: "60%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                marginTop: 30,
                borderRadius: 30,
                alignItems: "center",
                padding: 30,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "50%",
                  alignContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <h3 className="profilelabels">Bio</h3>
                {authStore.organizer.bio ? (
                  <h3 className="email">{authStore.organizer.bio}</h3>
                ) : (
                  <h3 className="emailnot">Not set yet!</h3>
                )}
              </div>
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
