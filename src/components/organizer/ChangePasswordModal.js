import { useState } from "react";
import authStore from "../../stores/authStore";
import { Modal, Button, Form } from "react-bootstrap";

function ChangePasswordModal({ handleCloseEdit }) {
  const [organizer, setOrganizer] = useState({
    username: `${authStore.organizer.username}`,
    newPassword: "",
    currentPassword: "",
  });
  const [checkValidation, setCheckValidation] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [checkValidationColor, setCheckValidationColor] = useState("#e52b51");
  const [showError, setShowError] = useState(true);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(true);
  const [number, setNumber] = useState(true);
  const [specialCharacter, setSpecialCharacter] = useState(true);
  const [characterLength, setCharacterLength] = useState(true);
  const [begining, setBegining] = useState(true);
  const [isCurrent, setIsCurrent] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    handleCloseEdit();
  };

  const handleShow = () => setShow(true);

  const handleChange = (event) => {
    const check = checkPassword(event.target.value);
    if (check === true) {
      setOrganizer({ ...organizer, [event.target.name]: event.target.value });
      setCheckValidation(false);
      setCheckValidationColor("#e52b51");
      setShowError(false);
    } else {
      setCheckValidation(true);
      setCheckValidationColor("#ea3e29");
      setShowError(true);
    }
  };

  const handleCurrent = (event) => {
    if (event.target.value !== "") {
      setOrganizer({ ...organizer, [event.target.name]: event.target.value });
      setIsCurrent(true);
    } else {
      setIsCurrent(false);
    }
  };

  const handleConfirm = (event) => {
    setBegining(false);
    if (organizer.newPassword === event.target.value) {
      setConfirmed(true);
    } else {
      setConfirmed(false);
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
    await authStore.changeOrganizer(organizer);
  };

  return (
    <div>
      <button className="editorg" onClick={handleShow}>
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
            </Form.Group>
            <Button
              style={{
                backgroundColor: "#e52b51",
                fontFamily: "Ubuntu",
              }}
              variant="primary"
              type="submit"
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

// <div className="RegisterModal">
//   <div class="background"></div>
//   <form className="form-styleh" onSubmit={handleSubmit}>
//     <div>
//       <label className="label-style">
//         <input
//           className="input-stylemain"
//           type="password"
//           placeholder="Password"
//           name="password"
//           onChange={handlePassword}
//         />
//         {beginingPassword === true ? (
//           <div className="validationy">Enter a password that contains at leat 8 characters, 1 lowerCase, 1 upperCase letter, 1 special character, and 1 number</div>
//         ) : (
//           <>
//             {passwordValidation === true ? (
//               <h6 className="validationx">Must contain at leat 8 characters, 1 lowerCase, 1 upperCase letter, 1 special character, and 1 number</h6>
//               ) : (
//               <h6 className="validation">Valid password</h6>
//             )}
//           </>
//         )}
//       </label>
//       {passwordValidation === false ? (
//         <input
//           className="button-sign ing-create"
//           type="submit"
//           value="Register"
//         />
//         ) : (
//         <input
//           className="button-signx ing-create"
//           type="submit"
//           disabled
//           value="Register"
//         />
//         )
//       }
//     </div>
//   </form>
// </div>

// const handlePassword = (event) => {
//   const check = checkPassword(event.target.value);
//   if(check === true){
//     setOrganizer({ ...organizer, [event.target.name]: event.target.value });
//     // setPasswordValidation(false);
//     // setCheckValidationColor("#e52b51");
//   } else{
//     // setPasswordValidation(true);
//     // setCheckValidationColor("red");
//     // setBeginingPassword(false);
//   }
// }
