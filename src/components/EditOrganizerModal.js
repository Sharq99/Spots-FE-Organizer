import React, { useState } from "react";
import authStore from "../stores/authStore";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { baseURL } from "../stores/instance";

function EditOrganizerModal({ handleCloseEdit }) {
  const [show, setShow] = useState(false);
  const [updateOrganizer, setUpdateOrganizer] = useState({
    phone: authStore.organizer.phone,
    bio: authStore.organizer.bio,
    email: authStore.organizer.email,
    image: authStore.organizer.image,
  });
  const [file, setFile] = useState(authStore.organizer.image);

  const handleClose = () => {
    setShow(false);
    handleCloseEdit();
  };

  const handleShow = () => setShow(true);

  const handleChange = (event) =>
    setUpdateOrganizer({
      ...updateOrganizer,
      [event.target.name]: event.target.value,
    });

  const handleImage = (event) => {
    let file = event.target.files[0];
    setFile(file);
    setUpdateOrganizer({ ...updateOrganizer, image: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    authStore.updateOrganizer(updateOrganizer);
    handleClose();
    handleCloseEdit();
  };

  return (
    <div>
      <button className="editorg" onClick={handleShow}>
        Edit Profile
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ borderBottomWidth: 0 }} closeButton>
          <Modal.Title style={{ fontFamily: "Ubuntu" }}>
            Update Profile
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div className="modalprofileImagediv">
                <img
                  className="modalprofileImage"
                  src={`${baseURL}${authStore.organizer.image}`}
                ></img>
              </div>
              <Form.Control
                style={{ fontFamily: "Ubuntu", objectFit: "contain" }}
                onChange={handleImage}
                type="file"
                autoFocus
                name="file"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontFamily: "Ubuntu" }}>
                Name in Arabic
              </Form.Label>
              <Form.Control
                style={{ fontFamily: "Source Sans Pro" }}
                onChange={handleChange}
                type="displayNameAr"
                defaultValue={authStore.organizer.displayNameAr}
                autoFocus
                name="displayNameAr"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontFamily: "Ubuntu" }}>
                Name in English
              </Form.Label>
              <Form.Control
                style={{ fontFamily: "Source Sans Pro" }}
                onChange={handleChange}
                type="displayNameEn"
                defaultValue={authStore.organizer.displayNameEn}
                autoFocus
                name="displayNameEn"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontFamily: "Ubuntu" }}>Email</Form.Label>
              <Form.Control
                style={{ fontFamily: "Source Sans Pro" }}
                onChange={handleChange}
                type="email"
                defaultValue={authStore.organizer.email}
                autoFocus
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontFamily: "Ubuntu" }}>Phone</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="number"
                style={{ fontFamily: "Source Sans Pro" }}
                defaultValue={authStore.organizer.phone}
                autoFocus
                name="phone"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <InputGroup>
                <InputGroup.Text style={{ fontFamily: "Ubuntu" }}>
                  Bio
                </InputGroup.Text>
                <FormControl
                  as="textarea"
                  style={{ fontFamily: "Source Sans Pro" }}
                  aria-label="With textarea"
                  defaultValue={authStore.organizer.bio}
                  onChange={handleChange}
                  name="bio"
                  maxLength={150}
                />
              </InputGroup>
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#e52b51",
                fontFamily: "Ubuntu",
              }}
              variant="primary"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditOrganizerModal;
