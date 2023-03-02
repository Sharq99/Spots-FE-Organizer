import { useState } from "react";
import authStore from "../../stores/authStore";
import { Modal, Button, Form } from "react-bootstrap";

function ForgotPassword() {
  const [organizerName, setOrganizerName] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleChange = (event) => setOrganizerName(event.target.value);

  const onSubmit = async (event) => {
    event.preventDefault();
    await authStore.forgotOrganizer(organizerName);
    handleClose();
  };

  return (
    // color: "#4831d4"
    <div>
      <input
        style={{
          backgroundColor: "transparent",
          fontSize: "15px",
          color: "white",
          borderWidth: "0px",
          marginTop: "3%",
        }}
        type="button"
        value="Forgot Password?"
        onClick={handleShow}
      />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ borderBottomWidth: 0 }} closeButton>
          <Modal.Title style={{ fontFamily: "Ubuntu" }}>
            Forgot Password
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontFamily: "Ubuntu" }}>
                Organizer's Email
              </Form.Label>
              <Form.Control
                style={{ fontFamily: "Source Sans Pro" }}
                onChange={handleChange}
                type="email"
                autoFocus
                name="email"
              />
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#e52b51",
                fontFamily: "Ubuntu",
              }}
              variant="primary"
              type="submit"
            >
              Send Email
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ForgotPassword;
