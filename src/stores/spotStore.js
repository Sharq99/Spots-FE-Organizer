import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import authStore from "./authStore";

class SpotStore {
  constructor() {
    makeAutoObservable(this);
  }

  spots = [];

  fetchSpots = async () => {
    try {
      const response = await instance.get("/spot");
      this.spots = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  createSpot = async (
    newSpot,
    categoryId,
    image,
    galleryFile0,
    galleryFile1,
    galleryFile2,
    galleryFile3,
    galleryFile4
  ) => {
    try {
      newSpot.image = image;
      newSpot.galleryImage0 = galleryFile0;
      newSpot.galleryImage1 = galleryFile1;
      newSpot.galleryImage2 = galleryFile2;
      newSpot.galleryImage3 = galleryFile3;
      newSpot.galleryImage4 = galleryFile4;
      const formData = new FormData();
      for (const key in newSpot) {
        formData.append(key, newSpot[key]);
      }
      const response = await instance.post(`/spot/cat/${categoryId}`, formData);
      this.spots.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  updateSpot = async (
    updatedSpot,
    spotId,
    file,
    categoryId,
    galleryFile0,
    galleryFile1,
    galleryFile2,
    galleryFile3,
    galleryFile4
  ) => {
    updatedSpot.image = file;
    updatedSpot.galleryImage0 = galleryFile0;
    updatedSpot.galleryImage1 = galleryFile1;
    updatedSpot.galleryImage2 = galleryFile2;
    updatedSpot.galleryImage3 = galleryFile3;
    updatedSpot.galleryImage4 = galleryFile4;
    try {
      const formData = new FormData();
      for (const key in updatedSpot) {
        formData.append(key, updatedSpot[key]);
      }
      const res = await instance.put(
        `/spot/update/${spotId}/cat/${categoryId}`,
        formData
      );
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      this.spots = this.spots.map((spot) =>
        spot._id === spotId ? res.data : spot
      );
    } catch (error) {
      console.log(error);
    }
  };

  deleteSpot = async (spotId) => {
    try {
      await instance.delete(`/spot/delete/${spotId}`);
      this.spots = this.spots.filter((spot) => spot._id !== spotId);
    } catch (error) {
      console.log(error);
    }
  };

  getSpotsById = (spotId) => {
    return this.spots.find((spot) => spot._id === spotId);
  };

  getSpots = () => {
    return this.spots;
  };
}

const spotStore = new SpotStore();
spotStore.fetchSpots();
export default spotStore;
