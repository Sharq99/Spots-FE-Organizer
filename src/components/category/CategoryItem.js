import { observer } from "mobx-react";
import { baseURL } from "../../stores/instance";

function CategoryItem({ category, setCategoryId }) {

    const handleCategory = () => {
        setCategoryId(category._id);
    }

  return (
    <div className="categorydiv">
        <button className="categorybutton" onClick={handleCategory}>
          <img className="Scrollcategoryimage" src={`${baseURL}${category.image}`}></img>
          {/* <div className="categoryname"> */}
          <h5>{category.name}</h5>
        {/* </div> */}
        </button>
    </div>
  );
}

export default CategoryItem;
