import { useState } from 'react';
import { Link } from 'react-router-dom';
import authStore from '../../stores/authStore';
// import { useNavigate } from "react-router-dom";

function RegisterModal() {
    // const nav = useNavigate();
  const [organizer, setOrganizer] = useState();

  const handleChange = (event) =>
  setOrganizer({ ...organizer, [event.target.name]: event.target.value });

  const handleSubmit =  (event) => {
    event.preventDefault();
  
    // try {
     authStore.register(organizer);
      // nav("/user-page");
    // } catch (e) {
    //   alert(e.message);
    // }
  }
  

  return (

    <div /*className='user-specs'*/>
        <div class="background"></div>
        <form className='form-styleh' onSubmit={handleSubmit}>
            <div>
                <label className='label-style'>
                    <h3>Register</h3>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={handleChange}
                    />
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                    />
                     <input
                        className='input-style'
                        type="number"
                        placeholder="Phone Number"
                        name="phone"
                        onChange={handleChange}
                    />
                     <input
                        className='input-style'
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                    />
                </label>
                {/* <Link to="/home"> */}
                    <input
                        className="button-sign ing-create"
                        type="submit"
                        value="Register"
                    />
                {/* </Link> */}
            </div>
        </form>
    </div>
  );
}

export default RegisterModal;