import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

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

  createSpot = async (newSpot, categoryId, sDate, file) => {
    try {
      newSpot.spotDate = sDate;
      newSpot.image = file;
      const formData = new FormData();
      for (const key in newSpot) formData.append(key, newSpot[key]);
      const response = await instance.post(`/spot/cat/${categoryId}`, formData);
      this.spots.push(response.data);
      // const response = await instance.post(`/spot/cat/${categoryId}`, newSpot);
      // this.spots.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  //Edit the Update
  updateSpot = async (updatedSpot, spotId) => {
    try {
      const res = await instance.put(`/spot/${spotId}`, updatedSpot);
      this.spots = this.spots.map((spot) =>
      spot._id === spotId ? res.data : spot
      );
    } catch (error) {
      console.log("here", error);
    }
  };

  deleteSpot = async (spotId) => {
    try {
      await instance.delete(`/spot/${spotId}`);
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
