function CategoryItem({ category, setCategoryId, setCategoryName }) {
  const handleCategory = () => {
    setCategoryId(category._id);
    setCategoryName(category.name);
  };

  return (
    <div className="center">
      <button className="categorybutton" onClick={handleCategory}>
        <h5 className="categoryname">{category.name}</h5>
      </button>
    </div>
  );
}

export default CategoryItem;
