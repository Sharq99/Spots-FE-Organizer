import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import EditOrganizerModal from "../EditOrganizerModal";
import LogOutButton from "../organizer/LogOutButton";
import ChangePasswordModal from "../organizer/ChangePasswordModal";
import { IoIosSettings, IoIosClose } from "react-icons/io";

function SettingsModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <h5 onClick={handleShow} name="stats-chart-outline" className="editorg">
        Settings
      </h5>

      <Modal size="sm" className="modal" show={show} onHide={handleClose}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 10,
            paddingTop: 5,
            paddingBottom: 0,
          }}
        >
          <Modal.Header
            style={{
              borderBottomWidth: 0,
              fontSize: 20,
              margin: 0,
              textAlign: "left",
            }}
          >
            Settings
          </Modal.Header>
          <IoIosClose
            style={{
              fontSize: 32,
              marginRight: 10,
            }}
            onClick={handleClose}
            name="stats-chart-outline"
            className="settingsmodal"
          ></IoIosClose>
        </div>
        <Modal.Body>
          <div className="center-settings">
            <EditOrganizerModal handleCloseEdit={handleClose} />
          </div>
          <div className="center-settings">
            <ChangePasswordModal handleCloseEdit={handleClose} />
          </div>
          <div className="center-settings">
            <LogOutButton />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SettingsModal;
