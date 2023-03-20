import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class CategoryStore {
  constructor() {
    makeAutoObservable(this);
  }

  categories = [];

  fetchCategories = async () => {
    try {
      const response = await instance.get(process.env.REACT_APP_CATEGORY);
      this.categories = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getCategoryById = (categoryId) => {
    return this.categories.find((category) => category._id === categoryId);
  };

  getCategories = () => {
    return this.categories;
  };
}

const categoryStore = new CategoryStore();
categoryStore.fetchCategories();
export default categoryStore;
