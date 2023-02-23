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
      nav("/Home");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <div class="background"></div>
      <form className="form-style" onSubmit={handleSubmit}>
        <div>
          <label className="label-style">
            <h3>Sign in to your portal</h3>
            <input
              className="input-stylemain"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              className="input-stylemain"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </label>
          <ForgotPassword />
          <input
            className="button-sign ing-create"
            type="submit"
            value="Login"
            style={{ marginTop: "3%" }}
          />
        </div>
      </form>
    </div>
  );
}

export default LogInModal;
