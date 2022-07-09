import { useState } from 'react';
import { Link } from 'react-router-dom';
import authStore from '../../stores/authStore';
import { useNavigate } from "react-router-dom";

function LogInModal() {
    const nav = useNavigate();
  const [organizer, setOrganizer] = useState();

  const handleChange = (event) =>
  setOrganizer({ ...organizer, [event.target.name]: event.target.value });

  const handleSubmit =  async (event) => {
    event.preventDefault();
    try {
     await authStore.login(organizer);
      nav("/Home");
    } catch (e) {
      alert(e.message);
    }
  }
  

  return (

    <div /*className='user-specs'*/>
        <div class="background"></div>
        <form className='form-style' onSubmit={handleSubmit}>
            <div>
                <label className='label-style'>
                    <h3>Login</h3>
                    <input
                        className='input-style'
                        type="text"
                        placeholder="Username"
                        name="username"
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
                    <input
                        className="button-sign ing-create"
                        type="submit"
                        value="Login"
                    />
            </div>
        </form>
    </div>
  );
}

export default LogInModal;



// check this later

// async function handleSubmit(event) {
//     event.preventDefault();
  
//     try {
//       await Auth.signIn(email, password);
//       userHasAuthenticated(true);
//       nav("/");
//     } catch (e) {
//       alert(e.message);
//     }
//   }