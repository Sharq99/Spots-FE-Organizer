import { observer } from "mobx-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import offerStore from "../../stores/offerStore";
import swal from "sweetalert";
import spotStore from "../../stores/spotStore";

function Experience() {
  const nav = useNavigate();
  const { spotId } = useParams();
  const spot = spotStore.getSpotsById(spotId);
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [offer, setOffer] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    image: "",
  });
  const [offerTitle, setOfferTitle] = useState(true);
  const [offerTitleAr, setOfferTitleAr] = useState(true);
  const [offerImage, setOfferImage] = useState(true);
  const [offerDescription, setOfferDescription] = useState(true);
  const [offerDescriptionAr, setOfferDescriptionAr] = useState(true);

  const handleChange = (event) => {
    setOffer({ ...offer, [event.target.name]: event.target.value });
    if (event.target.name === "title") {
      setOfferTitle(false);
    } else if (event.target.name === "titleAr") {
      setOfferTitleAr(false);
    } else if (event.target.name === "description") {
      setOfferDescription(false);
    } else if (event.target.name === "descriptionAr") {
      setOfferDescriptionAr(false);
    }
  };

  const handleImage = (event) => {
    let file = event.target.files[0];
    setFile(file);
    setOfferImage(false);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await offerStore.createOffer(offer, spotId, file);
      swal({
        title: "Success",
        text: `offer has been added`,
        icon: "success",
        button: "OK",
      }).then(function () {
        nav(`/ExperianceList/${spotId}`);
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="backgroundform">
      <div className="whitebackgroundoffers">
        <div className="center">
          <h1 className="dash">Add an Offer</h1>
        </div>
        <div className="createoffercontainer">
          <form onSubmit={handleSubmit} className="formdiv">
            <div className="firstdiv">
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 className="l-color">Offer Title English</h5>
                <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
              </div>
              <input
                className="input-style"
                type="text"
                multiple
                placeholder="Offer Title English"
                name="title"
                onChange={handleChange}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 className="l-color">Offer Title Arabic</h5>
                <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
              </div>
              <input
                className="input-style"
                type="text"
                multiple
                placeholder="Offer Title Arabic"
                name="titleAr"
                onChange={handleChange}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 className="l-color">
                  Offer Description English (90 characters max)
                </h5>
                <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
              </div>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "100px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
                placeholder="Offer Description English"
                name="description"
                maxLength={90}
                onChange={handleChange}
              />
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 className="l-color">
                  Offer Description Arabic (90 characters max)
                </h5>
                <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
              </div>
              <textarea
                cols="40"
                rows="5"
                style={{
                  height: "100px",
                  paddingTop: "10px",
                }}
                className="input-style"
                type="text"
                placeholder="Offer Description Arabic"
                name="descriptionAr"
                maxLength={90}
                onChange={handleChange}
              />
            </div>
            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h5 className="l-color">Upload an Image</h5>
                <h5 style={{ color: "red", marginTop: "10px" }}>*</h5>
              </div>
              <h5 className="l-color-tiny-image">
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
                    Your offer image goes here
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

                {offerTitle === false &&
                offerTitleAr === false &&
                offerImage === false &&
                offerDescription === false &&
                offerDescriptionAr === false ? (
                  <input
                    className="button-sign ing-create"
                    type="submit"
                    value="Add Offer"
                  />
                ) : (
                  <input
                    className="button-signx ing-create"
                    type="submit"
                    disabled
                    value="Add Offer"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Experience;
