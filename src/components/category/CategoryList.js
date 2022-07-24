import { observer } from "mobx-react";
import { useState } from "react";
import categoryStore from "../../stores/categoryStore";
import CategoryItem from "./CategoryItem";

function CategoryList({ setCategoryId, setCategoryName }) {
  const categoryList = categoryStore.categories?.map((category) => (
    <CategoryItem
      key={category._id}
      category={category}
      setCategoryId={setCategoryId}
      setCategoryName={setCategoryName}
    />
  ));
  return (
    <div className="categorycontainer">
      <div className="categoriescarousel">{categoryList}</div>
    </div>
  );
}

export default observer(CategoryList);
