import React, { useState } from "react";
import authStore from "../stores/authStore";
import { Modal, Button, Form, InputGroup, FormControl } from "react-bootstrap";

function EditOrganizerModal() {
  const [show, setShow] = useState(false);
  const [updateOrganizer, setUpdateOrganizer] = useState({
    phone: authStore.organizer.phone,
    bio: authStore.organizer.bio,
    email: authStore.organizer.email,
    image: authStore.organizer.image,
  });
  const [file, setFile] = useState(authStore.organizer.image);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const handleChange = (event) =>
    setUpdateOrganizer({ ...updateOrganizer, [event.target.name]: event.target.value });

  const handleImage = (event) => {
    let file = event.target.files[0];
    setFile(file);
    setUpdateOrganizer({ ...updateOrganizer, image: file });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    authStore.updateOrganizer(updateOrganizer, );
    handleClose();
  };

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Edit Profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Profile Picture</Form.Label>
              <Form.Control
                onChange={handleImage}
                type="file"
                autoFocus
                name="file"
              />
            </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cantact Email</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="email"
                placeholder="Enter Cantact Email"
                autoFocus
                name="email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cantact Number</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="number"
                placeholder="Enter Cantact Number"
                autoFocus
                name="phone"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <InputGroup>
                <InputGroup.Text>Bio</InputGroup.Text>
                <FormControl as="textarea" aria-label="With textarea" onChange={handleChange} name="bio"/>
              </InputGroup>
            </Form.Group>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EditOrganizerModal;
