import { observer } from "mobx-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import offerStore from "../../stores/offerStore";
import swal from "sweetalert";
import spotStore from "../../stores/spotStore";
import rewardStore from "../../stores/rewardStore";

function RewardExperience() {
  const nav = useNavigate();
  const { spotId } = useParams();
  const spot = spotStore.getSpotsById(spotId);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [reward, setReward] = useState({
    title: "",
    description: "",
    image: "",
    points: 0,
    isMultiClaim: true,
  });

  const handleChange = (event) => {
    setReward({ ...reward, [event.target.name]: event.target.value });
  };
  const handleOnce = (event) =>
    setReward({ ...reward, [event.target.name]: false });

  const handleMultiple = (event) =>
    setReward({ ...reward, [event.target.name]: true });

  const handleImage = (event) => {
    let file = event.target.files[0];
    setFile(file);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await rewardStore.createRewards(reward, spotId, file);
      swal({
        title: "Success",
        text: `Reward has been added`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        nav(`/ExperianceList/${spotId}`);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="backgroundform">
      <div className="whitebackground">
        <div className="center">
          <h1 className="dash">Add a Reward</h1>
        </div>
        <div className="createoffercontainer">
          <form onSubmit={handleSubmit} className="formdiv">
            <div className="firstdiv">
              <h5 className="l-color">Reward Title</h5>
              <input
                className="input-style"
                type="text"
                multiple
                placeholder="Reward Title"
                name="title"
                onChange={handleChange}
              />
              <h5 className="l-color">Reward Points</h5>
              <input
                className="input-style"
                type="number"
                multiple
                placeholder="Reward Points"
                name="points"
                onChange={handleChange}
              />
              <h5 className="l-color">
                Reward Description (90 characters max)
              </h5>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "100px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
                placeholder="Reward Description"
                name="description"
                maxLength={90}
                onChange={handleChange}
              />
            </div>
            <div>
              <h5 className="l-color">Upload an Image</h5>
              <h5 className="l-color-tiny">
                This is how your image will look like on the user's screen
              </h5>
              <div className="spotimagecontainer">
                {image ? (
                  <img
                    style={{
                      alignSelf: "flex-start",
                      width: 310,
                      height: 200,
                      borderRadius: 10,
                      objectFit: "cover",
                    }}
                    src={image}
                  ></img>
                ) : (
                  <label
                    style={{
                      alignSelf: "flex-start",
                      width: 310,
                      height: 200,
                      borderRadius: 10,
                      objectFit: "cover",
                    }}
                    className="offerimagetext"
                  >
                    Your reward image goes here
                  </label>
                )}
              </div>
              <div className="imagechoose">
                <input
                  className="input-style-choose"
                  type="file"
                  id="choose"
                  placeholder="Image URL"
                  name="image"
                  onChange={handleImage}
                />
                <label className="labelchoose" for="choose">
                  Choose image
                </label>

                <input
                  className="button-sign ing-create"
                  type="submit"
                  value="Add Reward"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RewardExperience;
