import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class PopularStore {
  constructor() {
    makeAutoObservable(this);
  }

  populars = [];

  fetchPopulars = async () => {
    try {
      const response = await instance.get(process.env.REACT_APP_POPULAR);
      this.populars = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  createPopular = async (newPopular, file) => {
    try {
      newPopular.image = file;
      const formData = new FormData();
      for (const key in newPopular) formData.append(key, newPopular[key]);
      const response = await instance.post(
        process.env.REACT_APP_POPULAR_CREATE,
        formData
      );
      console.log("response", response);
      this.populars.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  updatePopular = async (updatedPopular, popularId, file,) => {
    updatedPopular.image = file;

    try {
      const formData = new FormData();
      for (const key in updatedPopular) {
        formData.append(key, updatedPopular[key]);
      }
      const res = await instance.put(
        process.env.REACT_APP_POPULAR_UPDATE + '/' + popularId,
        formData
      );
      this.populars = this.populars.map((popular) =>
        popular._id === popularId ? res.data : popular
      );
      return "it works"
    } catch (error) {
      console.error("popular", error);
    }
  };

  deletePopular = async (popularId) => {
    try {
      await instance.delete(
        process.env.REACT_APP_POPULAR_DELETE + "/" + popularId
      );
      this.populars = this.populars.filter(
        (popular) => popular._id !== popularId
      );
    } catch (error) {
      console.log(error);
    }
  };

  getPopularById = (popularId) => {
    return this.populars.find((popular) => popular._id === popularId);
  };

  getPopulars = () => {
    return this.populars;
  };
}

const popularStore = new PopularStore();
popularStore.fetchPopulars();
export default popularStore;
