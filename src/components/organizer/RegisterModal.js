import { useState } from "react";
import { Link } from "react-router-dom";
import applicationStore from "../../stores/applicationStore";
import authStore from "../../stores/authStore";

function RegisterModal() {
  const [organizer, setOrganizer] = useState();
  const [sent, setSent] = useState(false);
  const [emailValidation, setEmailValidation] = useState(true);
  const [userNameValidation, setUserNameValidation] = useState(true);
  const [phoneNumberValidation, setPhoneNumberValidation] = useState(true);
  const [checkValidationColor, setCheckValidationColor] = useState("#4831d4");
  const [beginingUserName, setBeginingUserName] = useState(true);
  const [beginingEmail, setBeginingEmail] = useState(true);
  const [beginingPhoneNumber, setBeginingPhoneNumber] = useState(true);

  const handleUserName = (event) =>{
    const check = checkUserName(event.target.value);
      if(check === true){
        setOrganizer({ ...organizer, [event.target.name]: event.target.value });
        setUserNameValidation(false);
        setCheckValidationColor("#4831d4");
      } else{
        setUserNameValidation(true);
        setCheckValidationColor("red");
        setBeginingUserName(false);
      }
  }
  const handleEmail = (event) =>{
    const check = checkEmail(event.target.value);
    if(check === true){
      setOrganizer({ ...organizer, [event.target.name]: event.target.value });
      setEmailValidation(false);
      setCheckValidationColor("#4831d4");
    } else{
      setEmailValidation(true);
      setCheckValidationColor("red");
      setBeginingEmail(false);
    }
  }
  const handlePhoneNumber = (event) =>{
    const check = checkPhoneNumber(event.target.value);
    if(check === true){
      setOrganizer({ ...organizer, [event.target.name]: event.target.value });
      setPhoneNumberValidation(false);
      setCheckValidationColor("#4831d4");
    } else{
      setPhoneNumberValidation(true);
      setCheckValidationColor("red");
      setBeginingPhoneNumber(false);
    }
  }
    const checkEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    const checkUserName = (username) => {
      const re = new RegExp("^(?=.{2,})");
      return re.test(username);
    };

    const checkPhoneNumber = (phoneNumber) => {
      const re = new RegExp("^(?=.[0-9]{7,7}$)");
      // const re = new RegExp("^(?=.[0-9]{11,11}$)");
      // ^[0-9]{4} ^(?=.{8,})
      return re.test(phoneNumber);
    };

  const handleSubmit = (event) => {
    event.preventDefault();
    applicationStore.createApplications(organizer);
    setSent(true);
  };

  return (
    <>
    {sent === true ? (
      <div>
        <h1>in a few days your will receive an email informing you on weather ypur application has been accepted or deined</h1>
      </div>
    ) : (
      <div className="RegisterModal">
      <div class="background"></div>
      <form className="form-styleh" onSubmit={handleSubmit}>
        <div>
          <label className="label-style">
            <h3>Join Kuwait's #1 events app</h3>
            <input
              className="input-stylemain"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleUserName}
            />
            {beginingUserName === true ? (
              <div className="validationy">Must be at least 2 characters</div>
            ) : (
              <>
                {userNameValidation === true ? (
                  <div className="validationx">Must be at least 2 characters</div>   
                  ) : (
                  <div className="validation">Valid Username</div>   
                )}
              </>
            )}
            <input
              className="input-stylemain"
              type="text"
              placeholder="Email"
              name="email"
              onChange={handleEmail}
            />
            {beginingEmail === true ? (
              <div className="validationy">Enter a valid email</div>
            ) : (
              <>
                {emailValidation === true ? (
                  <h6 className="validationx">Invalid email</h6>   
                  ) : (
                  <h6 className="validation">Valid email</h6>   
                )}
              </>
            )}
            <input
              className="input-stylemain"
              type="number"
              placeholder="Phone Number"
              name="phone"
              onChange={handlePhoneNumber}
            />
            {beginingPhoneNumber === true ? (
              <div className="validationy">Enter a phone number consisting of 8 numbers</div>
            ) : (
              <>
                {phoneNumberValidation === true ? (
                  <h6 className="validationx">Must be 8 numbers</h6>   
                  ) : (
                  <h6 className="validation">Valid phone number</h6>   
                )}
              </>
            )}
          </label>
          {emailValidation === false && userNameValidation === false && phoneNumberValidation === false  ? (
            <input
              className="button-sign ing-create"
              type="submit"
              value="send application request"
            />
            ) : (
            <input
              className="button-signx ing-create"
              type="submit"
              disabled
              value="send application request"
            />
            )
          }
        </div>
      </form>
    </div>
    )}
    </>
  );
}

export default RegisterModal;