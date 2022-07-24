import React from "react";
import { NavLink } from "react-router-dom";
import LogOutButton from "./organizer/LogOutButton";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import {
  IoIosStats,
  IoIosAddCircle,
  IoIosContact,
  IoIosListBox,
} from "react-icons/io";

function Nav() {
  return (
    <>
      {authStore.organizer ? (
        <nav className="navtabs">
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#4831d4" : "grey",
            })}
            className="icon"
            to="/Home"
          >
            <IoIosStats name="stats-chart-outline"></IoIosStats>
          </NavLink>

          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#4831d4" : "grey",
            })}
            className="icon"
            to="/my-spots"
          >
            <IoIosListBox name="stats-chart-outline"></IoIosListBox>
          </NavLink>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#4831d4" : "grey",
            })}
            className="icon2"
            to="/create-spot"
          >
            <IoIosAddCircle name="stats-chart-outline"></IoIosAddCircle>
          </NavLink>

          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "#4831d4" : "grey",
            })}
            className="icon2"
            to="/settings"
          >
            <IoIosContact name="stats-chart-outline"></IoIosContact>
          </NavLink>
        </nav>
      ) : (
        <nav>
          <div className="nav">
            <div>
              <NavLink className="navitem" to="/Home"></NavLink>
            </div>
            <div className="navitem-right">
              <div className="userbuttons">
                <div>
                  <NavLink className="navitemPortal" to="/login">
                    <div className="navitemPortalDiv">My Portal</div>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
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
