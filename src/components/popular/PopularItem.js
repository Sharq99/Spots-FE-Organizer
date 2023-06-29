import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";
import { useState } from "react";
import swal from "sweetalert";
import popularStore from "../../stores/popularStore";
function PopularItem({ popular }) {
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

  const toggleCollapsible = () => {
    setIsActive(!isActive);
  };

  const handleChange = (event) => {
    setNewPopular({ ...newPopular, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await popularStore.updatePopular(newPopular, popular._id);
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
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: 20,
      }}
    >
      <img
        style={{
          height: 500,
          width: 460,
          objectFit: "cover",
          borderRadius: 20,
        }}
        src={baseURL + popular.image}
      ></img>

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
