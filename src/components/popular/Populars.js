import { observer } from "mobx-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import popularStore from "../../stores/popularStore";
import PopularList from "./PopularList";

function Populars() {
  const nav = useNavigate();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [popular, setPopular] = useState({
    title: "",
    titleAr: "",
    category: "",
    categoryAr: "",
    image: "",
    instagram: "",
    website: "",
    description: "",
    descriptionAr: "",
  });
  const handleChange = (event) => {
    setPopular({ ...popular, [event.target.name]: event.target.value });
  };
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
      await popularStore.createPopular(popular, file);
      swal({
        title: "Success",
        text: `Popular has been created`,
        icon: "success",
        button: "OK",
      });
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div className="whitebackgroundoffers">
      <h5 className="dash">Add popular</h5>
      <div className="createoffercontainer">
        <form onSubmit={handleSubmit} className="formdiv">
          <div className="firstdiv">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Popular Title English</h5>
            </div>
            <input
              className="input-style"
              type="text"
              multiple
              name="title"
              onChange={handleChange}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Popular Title Arabic</h5>
            </div>
            <input
              className="input-style"
              type="text"
              multiple
              name="titleAr"
              onChange={handleChange}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Popular Category English</h5>
            </div>
            <input
              className="input-style"
              type="text"
              multiple
              name="category"
              onChange={handleChange}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Popular Category Arabic</h5>
            </div>
            <input
              className="input-style"
              type="text"
              multiple
              name="categoryAr"
              onChange={handleChange}
            />
          </div>
          <div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Popular Instagram</h5>
            </div>
            <input
              className="input-style"
              type="text"
              multiple
              name="instagram"
              onChange={handleChange}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Popular Website</h5>
            </div>
            <input
              className="input-style"
              type="text"
              multiple
              name="website"
              onChange={handleChange}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Popular Description English</h5>
            </div>
            <textarea
              className="input-style"
              type="text"
              multiple
              name="description"
              onChange={handleChange}
              style={{ height: 200, padding: 10 }}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Popular Description Arabic</h5>
            </div>
            <textarea
              className="input-style"
              type="text"
              multiple
              name="descriptionAr"
              onChange={handleChange}
              style={{ height: 200, padding: 10, textAlign: "right" }}
            />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h5 className="l-color">Upload an Image</h5>
            </div>
            <h5 className="l-color-tiny-image">
              This is how your image will look like on the user's screen
            </h5>
            <div className="spotimagecontainer">
              {image ? (
                <img
                  style={{
                    alignSelf: "flex-start",
                    width: 420,
                    height: 420,
                    borderRadius: 10,
                    objectFit: "cover",
                  }}
                  src={image}
                ></img>
              ) : (
                <label
                  style={{
                    alignSelf: "flex-start",
                    width: 400,
                    height: 300,
                    borderRadius: 10,
                    objectFit: "cover",
                  }}
                  className="offerimagetext"
                >
                  Your popular image goes here
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
                value="Publish popular"
              />
            </div>
          </div>
        </form>
      </div>
      <h5 className="dash">Edit populars</h5>
      <PopularList />
    </div>
  );
}

export default observer(Populars);
