import { useState } from "react";
import authStore from "../../stores/authStore";
import { Modal, Button, Form } from "react-bootstrap";

function ChangePasswordModal({ handleCloseEdit }) {
  const [organizer, setOrganizer] = useState({
    id: `${authStore.organizer.id}`,
    newPassword: "",
    currentPassword: "",
  });
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [confirmed, setConfirmed] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#e52b51");
  const [checkValidationColorConfirm, setCheckValidationColorConfirm] = useState("#e52b51");
  const [showError, setShowError] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [number, setNumber] = useState(true);
  const [specialCharacter, setSpecialCharacter] = useState(true);
  const [characterLength, setCharacterLength] = useState(true);
  const [show, setShow] = useState(false);
  const [beginingNew, setBeginingNew] = useState(true);
  const [beginingConfirm, setBeginingConfirm] = useState(true);
  const handleClose = () => {
    setShow(false);
    handleCloseEdit();
  };

  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    setBeginingNew(false);
    const check = checkPassword(event.target.value);
    if (check === true) {
      setOrganizer({ ...organizer, [event.target.name]: event.target.value });
      setCheckValidationColor("#1bb21b");
      setShowError(false);
      if (confirmedPassword === event.target.value) {
        setConfirmed(false);
        setCheckValidationColorConfirm("#1bb21b")
      } else {
        setConfirmed(true);
        setCheckValidationColorConfirm("#e52b51")
      }
    } else {
      setCheckValidationColor("#e52b51");
      setShowError(true);
    }
  };

  const handleCurrent = (event) => {
      setOrganizer({ ...organizer, [event.target.name]: event.target.value });
  };

  const handleConfirm = (event) => {
    setBeginingConfirm(false);
    if (organizer.newPassword === event.target.value) {
      setConfirmed(false);
      setConfirmedPassword(event.target.value)
      setCheckValidationColorConfirm("#1bb21b")
    } else {
      setConfirmed(true);
      setCheckValidationColorConfirm("#e52b51")
    }
  };

  const checkPassword = (password) => {
    const re = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const lowerCase = new RegExp("^(?=.*[a-z])");
    const upperCase = new RegExp("^(?=.*[A-Z])");
    const number = new RegExp("^(?=.*[0-9])");
    const specialCharacter = new RegExp("^(?=.*[!@#$%^&*])");
    const characterLength = new RegExp("^(?=.{8,})");

    if (lowerCase.test(password) === true) {
      setLowerCase(false);
    } else {
      setLowerCase(true);
    }

    if (upperCase.test(password) === true) {
      setUpperCase(false);
    } else {
      setUpperCase(true);
    }

    if (number.test(password) === true) {
      setNumber(false);
    } else {
      setNumber(true);
    }

    if (specialCharacter.test(password) === true) {
      setSpecialCharacter(false);
    } else {
      setSpecialCharacter(true);
    }

    if (characterLength.test(password) === true) {
      setCharacterLength(false);
    } else {
      setCharacterLength(true);
    }

    return re.test(password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await authStore.changeOrganizer(organizer, handleClose, confirmedPassword);
  };

  return (
    <div>
      <button className="settingsbuttons" onClick={handleShow}>
        Change Password
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ borderBottomWidth: 0 }} closeButton>
          <Modal.Title style={{ fontFamily: "Ubuntu" }}>
            Change Password
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontFamily: "Ubuntu" }}>
                Current Password
              </Form.Label>
              <Form.Control
                style={{ fontFamily: "Source Sans Pro" }}
                onChange={handleCurrent}
                type="password"
                autoFocus
                name="currentPassword"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontFamily: "Ubuntu" }}>
                New Password
              </Form.Label>
              <Form.Control
                style={{ fontFamily: "Source Sans Pro" }}
                onChange={handleChange}
                type="password"
                autoFocus
                name="newPassword"
              />
              {beginingNew === false &&
                <p class="text-center" style={{
                  fontSize: '12px',
                  fontFamily: "Ubuntu",
                  paddingTop: "5px",
                  fontWeight: '550',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  color: checkValidationColor
                }}>Password must be contain: at least one number, uppercase letter, lowercase letter, 8 characters long and one special character(&#33;&#64;&#35;&#36;&#37;&#94;&#38;&#40;&#41;&#95;&#43;&#45;&#61;&#91;&#93;&#123;&#125;&#59;&#39;&#58;&#34;&#92;&#124;&#44;&#46;&#60;&#62;&#47;&#63;)</p>
              }
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label style={{ fontFamily: "Ubuntu" }}>
                Confirm Password
              </Form.Label>
              <Form.Control
                style={{ fontFamily: "Source Sans Pro" }}
                onChange={handleConfirm}
                type="password"
                autoFocus
                name="confirmPassword"
              />
              {beginingConfirm === false && 
                <p class="text-center" style={{
                  fontSize: '12px',
                  fontFamily: "Ubuntu",
                  fontWeight: '550',
                  paddingTop: "5px",
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  textAlign: 'center',
                  color: checkValidationColorConfirm
                }}>Passwords must match</p>
              }
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#e52b51",
                fontFamily: "Ubuntu",
              }}
              variant="primary"
              type="submit"
              disabled={characterLength === false && specialCharacter === false && number === false && upperCase === false && lowerCase === false && confirmed === false && organizer.currentPassword !== '' ? false : true}
            >
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ChangePasswordModal;
