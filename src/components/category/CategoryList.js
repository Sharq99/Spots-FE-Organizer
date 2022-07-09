import { observer } from "mobx-react";
import categoryStore from "../../stores/categoryStore";
import CategoryItem from "./CategoryItem";
import authStore from "../../";

function CategoryList({setCategoryId}) {
  const categoryList = categoryStore.categories?.map((category) => (
    <CategoryItem key={category._id} category={category} setCategoryId={setCategoryId} />
  ));

  return (
    <div className="center">
      <div className="container" style={{ width: "70%" }}>
        <div className="categorycontainer">
          <h1 className="categorytitle">Choose a category</h1>
          <div className="categoriescarousel">{categoryList}</div>
        </div>
      </div>
    </div>
  );
}

export default observer(CategoryList);
