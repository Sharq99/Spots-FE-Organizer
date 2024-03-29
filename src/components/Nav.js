import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogOutButton from "./organizer/LogOutButton";
import authStore from "../stores/authStore";
import { observer } from "mobx-react";
import {
  IoIosStats,
  IoIosAddCircle,
  IoIosContact,
  IoIosListBox,
  IoMdPersonAdd,
  IoMdPerson,
  IoIosApps,
} from "react-icons/io";
import {
  RiAdvertisementFill,
  RiLockPasswordFill,
  RiSpam2Fill,
} from "react-icons/ri";
import { AiFillNotification } from "react-icons/ai";
import { HiViewGridAdd } from "react-icons/hi";

function Nav() {
  const nav = useNavigate();
  return (
    <>
      {authStore.organizer ? (
        <>
          {authStore.organizer?.email ===
          process.env.REACT_APP_DEST_KEY_ADMN ? (
            <nav className="navtabs">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/populars"
              >
                <IoIosApps name="stats-chart-outline"></IoIosApps>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/applications"
              >
                <IoMdPersonAdd name="stats-chart-outline"></IoMdPersonAdd>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/active-organizers"
              >
                <IoMdPerson name="stats-chart-outline"></IoMdPerson>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/forgot-passwords"
              >
                <RiLockPasswordFill name="stats-chart-outline"></RiLockPasswordFill>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/addDests"
              >
                <HiViewGridAdd name="stats-chart-outline"></HiViewGridAdd>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/Report"
              >
                <RiSpam2Fill name="stats-chart-outline"></RiSpam2Fill>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/Ads"
              >
                <RiAdvertisementFill name="stats-chart-outline"></RiAdvertisementFill>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/PushNotification"
              >
                <AiFillNotification name="stats-chart-outline"></AiFillNotification>
              </NavLink>
              <LogOutButton />
            </nav>
          ) : (
            <nav className="navtabs">
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/Home"
              >
                <IoIosStats name="stats-chart-outline"></IoIosStats>
              </NavLink>

              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon"
                to="/my-spots"
              >
                <IoIosListBox name="stats-chart-outline"></IoIosListBox>
              </NavLink>
              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon2"
                to="/Pick-Date"
              >
                <IoIosAddCircle name="stats-chart-outline"></IoIosAddCircle>
              </NavLink>

              <NavLink
                style={({ isActive }) => ({
                  color: isActive ? "#e52b51" : "grey",
                })}
                className="icon2"
                to="/settings"
              >
                <IoIosContact name="stats-chart-outline"></IoIosContact>
              </NavLink>
            </nav>
          )}
        </>
      ) : (
        <nav>
          <div className="nav">
            <div>
              <NavLink className="navitem" to="/Home"></NavLink>
            </div>
            <div className="navitemPortal">
              <img
                onClick={() => nav(`/`)}
                src="https://i.ibb.co/ygfMmRW/icon-copy-2.png"
                style={{ height: 70, width: 60, cursor: "pointer" }}
              />
              <NavLink className="navitemmyPortal" to="/login">
                <div className="navitemPortalDiv">My Portal</div>
              </NavLink>
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
