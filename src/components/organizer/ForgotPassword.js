import { useState } from "react";
import authStore from "../../stores/authStore";
import { Modal, Button, Form} from "react-bootstrap";

function ForgotPassword() {
  
  const [organizerName, setOrganizerName] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleChange = (event) =>
    setOrganizerName(event.target.value );

  const onSubmit = async (event) => {
    event.preventDefault();
    await authStore.forgotOrganizer(organizerName)
    handleClose()
  };

  return (
    // color: "#4831d4"
    <div>
        <input style={{ position: "absolute", marginLeft: "37%", marginTop: "25%", backgroundColor: "transparent", fontSize: "15px", color: "white", borderWidth: "0px" }} type="button" value="Forgot Password?" onClick={handleShow} />

        <Modal show={show} onHide={handleClose}>
            <Modal.Header style={{ borderBottomWidth: 0 }} closeButton>
            <Modal.Title style={{ fontFamily: "Ubuntu" }}>
                Forgot Password
            </Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontFamily: "Ubuntu" }}>Organizer's Username</Form.Label>
                <Form.Control
                    style={{ fontFamily: "Source Sans Pro" }}
                    onChange={handleChange}
                    type="username"
                    autoFocus
                    name="username"
                />
                </Form.Group>
                <Button
                style={{
                    backgroundColor: "#9279F7",
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