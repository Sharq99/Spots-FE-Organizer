import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useState } from "react";
import swal from "sweetalert";
import popularStore from "../../stores/popularStore";
import Toggle from "react-toggle";

function PopularItem({ popular, id }) {
  const [newPopular, setNewPopular] = useState({
    title: popular.title,
    titleAr: popular.titleAr,
    category: popular.category,
    categoryAr: popular.categoryAr,
    image: popular.image,
    instagram: popular.instagram,
    website: popular.website,
    description: popular.description,
    descriptionAr: popular.descriptionAr,
  });

  const [isActive, setIsActive] = useState(false);
  const [file, setFile] = useState(popular?.image);
  const [image, setImage] = useState("");
  const [currentId, setCurrentId] = useState(id);
  const [checked, setChecked] = useState(popular?.expired);

  const toggleCollapsible = () => {
    setIsActive(!isActive);
  };

  const handleChange = (event) => {
    setNewPopular({ ...newPopular, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log("hello i in submit");
      await popularStore
        .updatePopular(newPopular, currentId, file)
        .then((response) => {
          if (response) {
            swal({
              title: "Success",
              text: `Popular has been updated`,
              icon: "success",
              button: "OK",
            });
          } else {
            swal({
              title: "welp that didnt work 🤷‍♂️",
              text: `oh no! 🥹 please try again`,
              icon: "warning",
              button: "OK",
            });
          }
        });
    } catch (e) {
      alert(e.message);
    }
  };
  const handleDelete = () => {
    swal({
      title: "Are you sure?",
      text: "This Popular Will Be Permanently Deleted!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Deleted!", "Your Popular has been deleted!", {
          icon: "success",
        });
        popularStore.deletePopular(popular?._id);
      }
    });
  };
  const handleImage = async (event, id) => {
    event.preventDefault();
    let file = event.target.files[0];
    setFile(file);
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      setImage(reader.result);
    });
    reader.readAsDataURL(file);
    try {
      await popularStore
        .updatePopular(newPopular, id, file)
        .then((response) => {
          if (response) {
            swal({
              title: "Success",
              text: `Popular has been updated`,
              icon: "success",
              button: "OK",
            });
          } else {
            swal({
              title: "welp that didnt work 🤷‍♂️",
              text: `oh no! 🥹 please try again`,
              icon: "warning",
              button: "OK",
            });
          }
        });
    } catch (e) {
      alert(e.message);
    }
  };

  const handleExpiary = (isExpired) => {
    setNewPopular({ ...newPopular, ["expired"]: isExpired });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 20,
      }}
    >
      <div>
        <input
          style={{
            borderRadius: 20,
            borderWidth: 2,
            borderColor: "#e52b51",
            height: 500,
            width: 480,
            display: "none",
          }}
          type="file"
          id={currentId}
          placeholder="Image URL"
          name="image"
          onChange={(event) => handleImage(event, currentId)}
        />
        <button
          style={{
            borderRadius: 20,
            borderWidth: 9,
            borderColor: "#e52b51",
            height: 500,
            width: 480,
            background: "none",
            border: "none",
            padding: 0,
          }}
          onClick={() => {
            document.getElementById(currentId).click();
          }}
        >
          <img
            style={{
              height: 500,
              width: 460,
              objectFit: "cover",
              borderRadius: 20,
            }}
            src={image ? image : `${baseURL}${popular.image}`}
            alt="Popular Image"
          />
        </button>
      </div>

      <button
        style={{
          marginTop: 10,
          width: "50%",
          alignSelf: "center",
        }}
        className={`collapsible ${isActive ? "active" : ""}`}
        onClick={() => toggleCollapsible()}
      >
        Edit
      </button>
      <button
        style={{
          marginTop: 10,
          width: "50%",
          alignSelf: "center",
        }}
        className="editorg"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
      {isActive === true ? (
        <div className="content">
          <input
            className="input-style"
            type="text"
            defaultValue={popular.title}
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
          <input
            className="input-style"
            type="text"
            defaultValue={popular.titleAr}
            name="titleAr"
            placeholder="TitleAr"
            onChange={handleChange}
          />
          <input
            className="input-style"
            type="text"
            defaultValue={popular.instagram}
            name="instagram"
            placeholder="Instagram"
            onChange={handleChange}
          />
          <input
            className="input-style"
            type="text"
            defaultValue={popular.website}
            name="website"
            placeholder="Website"
            onChange={handleChange}
          />
          <input
            className="input-style"
            type="text"
            defaultValue={popular.category}
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />
          <input
            className="input-style"
            type="text"
            defaultValue={popular.categoryAr}
            name="categoryAr"
            placeholder="CategoryAr"
            onChange={handleChange}
          />
          <textarea
            className="input-style"
            type="text"
            defaultValue={popular.description}
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <textarea
            className="input-style"
            type="text"
            defaultValue={popular.descriptionAr}
            name="descriptionAr"
            placeholder="DescriptionAr"
            onChange={handleChange}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <h5 className="l-color" style={{ marginRight: 8 }}>
              Popular Expired?
            </h5>
            <input
              type="radio"
              id="expired"
              name="expiredPopular"
              className="radio"
              onChange={() => handleExpiary(true)}
            />
            <label className="radiotext" for="expired">
              Yes
            </label>
            <input
              type="radio"
              id="expired"
              name="expiredPopular"
              className="radio"
              onChange={() => handleExpiary(false)}
            />
            <label for="expired">No</label>
          </div>
          <label
            style={{
              fontSize: 20,
            }}
          >
            Saves: {popular.saves}
          </label>
          <button
            style={{ width: 100, marginTop: 20 }}
            className="editorg"
            title="Edit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default observer(PopularItem);
