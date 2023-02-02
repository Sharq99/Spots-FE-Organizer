import { useState } from "react";
import swal from "sweetalert";
import authStore from "../../stores/authStore";

function ManageDests() {
  const [addDests, setAddDests] = useState({
    numofDests: 0,
    oranizerUsername: "",
  });
  const [numofDests, setNumofDests] = useState(true);
  const [userId, setUserId] = useState(true);

  const handleChange = (event) => {
    setAddDests({ ...addDests, [event.target.name]: event.target.value });
    if (event.target.name === "numofDests" && event.target.value === "") {
        setNumofDests(true);
    } else if(event.target.name === "numofDests" && event.target.value !== "") {
        setNumofDests(false);
    } else if (event.target.name === "oranizerUsername" &&  event.target.value === "") {
        setUserId(true);
    } else if (event.target.name === "oranizerUsername" && event.target.value !== "") {
        setUserId(false);
    }
  };


  const handleSubmit = async (event) => { // TODO add functions later ==> figure out the store
    event.preventDefault();
    try{
        await authStore.addDestsToOrganizer(addDests).then(
            swal({
                title: "Dests Added",
                icon: "success",
                confirmButtonText: "OK",
              })
        )
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div className="backgroundform">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1 className="dash">Add Dests to Organizer</h1>
        </div>

        <div className="whitebackgroundcreate">
          <form onSubmit={handleSubmit} >
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly"}}>
                <div>
                    <div style={{ display: "flex", flexDirection: "row" }}> {/* Username */}
                        <h5 className="l-color">Enter Organizer's Username</h5>
                        <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                    </div>
                    <input
                        className="input-style"
                        type="text"
                        multiple
                        placeholder="Organizer's Username"
                        name="oranizerUsername"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <div style={{ display: "flex", flexDirection: "row" }}> {/* numberofDests */}
                        <h5 className="l-color">Enter Number of Dests</h5>
                        <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
                    </div>
                    <input
                        className="input-style"
                        type="number"
                        placeholder="Number of Dests"
                        name="numofDests"
                        onChange={handleChange}
                    />
                </div>
              </div>
            {userId === false && numofDests === false  ? (
                <input
                    className="button-sign ing-create"
                    type="submit"
                    value="Add Dests"
                />
                ) : (
                <input
                    className="button-signx ing-create"
                    type="submit"
                    disabled
                    value="Add Dests"
                />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManageDests;
