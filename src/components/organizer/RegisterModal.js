import { useState } from "react";
import { Link } from "react-router-dom";
import authStore from "../../stores/authStore";
// import { useNavigate } from "react-router-dom";

function RegisterModal() {
  // const nav = useNavigate();
  const [organizer, setOrganizer] = useState();

  const handleChange = (event) =>
    setOrganizer({ ...organizer, [event.target.name]: event.target.value });

  const handleSubmit = (event) => {
    event.preventDefault();
    authStore.register(organizer);
  };

  return (
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
              onChange={handleChange}
            />
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
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
          </label>
          <input
            className="button-sign ing-create"
            type="submit"
            value="Register"
          />
        </div>
      </form>
    </div>
  );
}

export default RegisterModal;
