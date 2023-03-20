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
      const response = await instance.get(process.env.REACT_APP_DEST);
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
    galleryFile4,
    adImage0,
    adImage1,
    adImage2,
    adImage3,
    adImage4
  ) => {
    try {
      newSpot.image = image;
      newSpot.galleryImage0 = galleryFile0;
      newSpot.galleryImage1 = galleryFile1;
      newSpot.galleryImage2 = galleryFile2;
      newSpot.galleryImage3 = galleryFile3;
      newSpot.galleryImage4 = galleryFile4;
      newSpot.adImage0 = adImage0;
      newSpot.adImage1 = adImage1;
      newSpot.adImage2 = adImage2;
      newSpot.adImage3 = adImage3;
      newSpot.adImage4 = adImage4;
      const formData = new FormData();
      for (const key in newSpot) {
        formData.append(key, newSpot[key]);
      }
      const response = await instance.post(process.env.REACT_APP_DEST_CREATE+'/'+categoryId, formData);
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
    galleryFile4,
    adImage0,
    adImage1,
    adImage2,
    adImage3,
    adImage4
  ) => {
    updatedSpot.image = file;
    updatedSpot.galleryImage0 = galleryFile0;
    updatedSpot.galleryImage1 = galleryFile1;
    updatedSpot.galleryImage2 = galleryFile2;
    updatedSpot.galleryImage3 = galleryFile3;
    updatedSpot.galleryImage4 = galleryFile4;
    updatedSpot.adImage0 = adImage0;
    updatedSpot.adImage1 = adImage1;
    updatedSpot.adImage2 = adImage2;
    updatedSpot.adImage3 = adImage3;
    updatedSpot.adImage4 = adImage4;
    try {
      const formData = new FormData();
      for (const key in updatedSpot) {
        formData.append(key, updatedSpot[key]);
      }
      const res = await instance.put(
        process.env.REACT_APP_DEST_UPDATE1+'/'+spotId+process.env.REACT_APP_DEST_UPDATE2+'/'+categoryId,
        formData
      );
      this.spots = this.spots.map((spot) =>
        spot._id === spotId ? res.data : spot
      );
    } catch (error) {
      console.log(error);
    }
  };

  deleteSpot = async (spotId) => {
    try {
      await instance.delete(process.env.REACT_APP_DEST_REMOVE+'/'+spotId);
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
