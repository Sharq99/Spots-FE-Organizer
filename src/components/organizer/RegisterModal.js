import { useState } from "react";
import applicationStore from "../../stores/applicationStore";

function RegisterModal() {
  const [organizer, setOrganizer] = useState({
    email: "",
    phone: "",
    instagram: "",
  });
  const [sent, setSent] = useState(false);
  const [emailValidation, setEmailValidation] = useState(true);
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(true);
  const [instagramValidation, setInstagramValidation] = useState(true);

  const handleChange = (event) => {
    setOrganizer({ ...organizer, [event.target.name]: event.target.value });
    if (event.target.name === "email") {
      if (event.target.value === "") {
        setEmailValidation(true);
      } else {
        setEmailValidation(false);
      }
    } else if (event.target.name === "phone") {
      if (event.target.value === "") {
        setPhoneNumberValidation(true);
      } else {
        setPhoneNumberValidation(false);
      }
    } else if (event.target.name === "instagram") {
      if (event.target.value === "") {
        setInstagramValidation(true);
      } else {
        setInstagramValidation(false);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    applicationStore.createApplications(organizer);
    setSent(true);
  };

  return (
    <>
      {sent === true ? (
        <div className="welcomeformrow">
          <label className="confirmation">
            Thank You!<br></br> You will receive an email from us very soon!
          </label>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "8%",
            marginBottom: "5%",
            justifyContent: "space-evenly",
          }}
          className="welcomeformrow"
        >
          <h3 className="eventsapp">Join Kuwait's First Events App</h3>
          <form className="form-styleh" onSubmit={handleSubmit}>
            <h3>Register now!</h3>
            <input
              className="input-stylemain"
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="input-stylemain"
              type="number"
              placeholder="Phone Number"
              name="phone"
              onChange={handleChange}
            />
            <input
              className="input-stylemain"
              type="text"
              placeholder="Instagram"
              name="instagram"
              onChange={handleChange}
            />
            {emailValidation === false &&
            phoneNumberValidation === false &&
            instagramValidation === false ? (
              <input
                className="button-sign ing-create"
                type="submit"
                value="Send Application"
              />
            ) : (
              <input
                className="button-signx ing-create"
                type="submit"
                disabled
                value="Send Application"
              />
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default RegisterModal;
