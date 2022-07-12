import { observer } from "mobx-react";
import LogOutButton from "./organizer/LogOutButton";
import authStore from "../stores/authStore";
import { baseURL } from "../stores/instance";
import EditOrganizerModal from "./EditOrganizerModal"

function Settings() {
  console.log("users: "+authStore?.organizer?.spots?.length)

  return (
    <div>
      {authStore.organizer ? (
              <>
                {/* <div className="center">
                  <div className="categoryshape">
                    <div className="categoryshape">
                      <div className="categorybutton">
                        <img className="recipeimage" src={"https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg"}></img>
                      </div>
                    </div>
                  </div>
                  width: 200;
                  height: 200;
                  border-radius: 500;
                  margin-right: 105;
                  margin-left: 112;
                  margin-top: 60;
                  border-width: 2;
                    
                    <h1 className="Welcome">{authStore.organizer.username}</h1> */}
                    {/* <div className="center-settings"> */}
                      <h1 className="profile center-settings" >{authStore.organizer.username}</h1>
                      <div className="imageUserNameEdit center-settings">
                        <div className="imageUserName">
                          <img className="profileImage" src={`${baseURL}${authStore.organizer.image}`}></img>
                          {/* <img src="https://nenow.in/wp-content/uploads/2018/03/royal-bengal-tiger.jpg" width="200" height="200"  border-radius="50%" border-width="20"></img> */}
                          {/* className="profileImage" */}
                        </div>
                      </div>
                      <div>
                          <h3 className="bio center-settings">{authStore.organizer.bio}</h3>
                          <h3 className="bio center-settings">Email: {authStore.organizer.email}</h3>
                          <h3 className="bio center-settings">Tel: {authStore.organizer.phone}</h3>
                      {/* </div> */}
                      <div className="center-settings"><EditOrganizerModal/></div>
                      <div className="center-settings"><LogOutButton/></div>
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


      