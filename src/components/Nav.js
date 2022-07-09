import React from "react";
import { NavLink } from "react-router-dom";
import LogOutButton from "./organizer/LogOutButton";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";

function Nav() {
    return (
      <nav>
        <div className="nav">
          <div>
            <NavLink className="navitem" to="/Home">
              Home
            </NavLink>
          </div>
          <div className="navitem-right">
            <div className="userbuttons">
              {authStore.organizer ? (
                <>
                    <NavLink className="navitem " to="/my-spots">
                        My Spots
                    </NavLink>

                    <NavLink className="navitem " to="/create-spot">
                        Create a Spot
                    </NavLink>

                    <NavLink className="navitem " to="/settings">
                        <img src="" />
                        {authStore.organizer.username}'s Profile
                    </NavLink>
                </>
              ) : (
                // if user is null(not logged in) add signup/signin buttons ==> if user is not null(logged in) remove signup/signin buttons
                <>
                    <NavLink className="navitem " to="/login">
                        Portal
                    </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default observer(Nav);

// function Nav() {
//   return (
//     <nav>
//       <div className="nav">
//           {/* <div className="userbuttons"> */}
//             {authStore.organizer ? (
//               <>
//                 <LogOutButton />
//               </>
//             ) : (
//               // if user is null(not logged in) add signup/signin buttons ==> if user is not null(logged in) remove signup/signin buttons
//               <>
//                 <div className="navitem-right">
//                     <NavLink className="navitem" to="/Home">
//                         Home
//                     </NavLink>

//                     <NavLink className="navitem " to="/login">
//                         Portal
//                     </NavLink>
//                 </div>
//               </>
//             )}
//           {/* </div> */}
//         </div>
//     </nav>
//   );
// }

// export default observer(Nav);
