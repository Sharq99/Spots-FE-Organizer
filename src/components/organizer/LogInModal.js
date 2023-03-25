import { useState } from "react";
import { Link } from "react-router-dom";
import authStore from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

function LogInModal() {
  const nav = useNavigate();
  const [organizer, setOrganizer] = useState();

  const handleChange = (event) =>
    setOrganizer({ ...organizer, [event.target.name]: event.target.value });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authStore.login(organizer);
      if (authStore.organizer) nav("/Home");
    } catch (e) {
      alert(e.message);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  return (
    <div>
      <div
        style={{
          marginTop: 100,
        }}
        className="welcomeformrow"
      >
        <div className="form-styleh">
          <label className="label-style">
            <h2
              style={{
                textAlign: "center",
                fontSize: 30,
                marginBottom: 25,
              }}
            >
              Login to your portal
            </h2>
            <input
              className="input-stylemain"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <input
              className="input-stylemain"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </label>
          <ForgotPassword />
          <input
            className="button-sign ing-create"
            type="submit"
            value="Login"
            onClick={handleSubmit}
            style={{ marginTop: "3%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default LogInModal;
