import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import EditOrganizerModal from "../EditOrganizerModal";
import LogOutButton from "../organizer/LogOutButton";
import { IoIosArrowDown } from "react-icons/io";

function SettingsModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <IoIosArrowDown
        onClick={handleShow}
        name="stats-chart-outline"
        className="settingsmodal"
      ></IoIosArrowDown>

      <Modal size="sm" className="modal" show={show} onHide={handleClose}>
        <Modal.Header
          style={{ borderBottomWidth: 0 }}
          closeButton
        ></Modal.Header>
        <Modal.Body>
          <div className="center-settings">
            <EditOrganizerModal handleCloseEdit={handleClose} />
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
