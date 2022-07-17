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

  createSpot = async (newSpot, categoryId, file) => {
    try {
      // console.log("sDate: "+JSON.stringify(sDate))
      // newSpot.spotDate = sDate;
      // console.log("newSpot.spotDate: "+JSON.stringify(newSpot.spotDate))
      newSpot.image = file;
      const formData = new FormData();
      for (const key in newSpot) formData.append(key, newSpot[key]);
      const response = await instance.post(`/spot/cat/${categoryId}`, formData);
      this.spots.push(response.data);
      authStore.organizer.spots.push(response.data._id);
      // const response = await instance.post(`/spot/cat/${categoryId}`, newSpot);
      // this.spots.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  updateSpot = async (updatedSpot, spotId, file, categoryId) => {
    updatedSpot.image = file;
    try {
      const formData = new FormData();
      for (const key in updatedSpot) formData.append(key, updatedSpot[key]);
      const res = await instance.put(`/spot/update/${spotId}/cat/${categoryId}`, formData);
      // const res = await instance.put(`/spot/${spotId}`, updatedSpot);
      this.spots = this.spots.map((spot) =>
      spot._id === spotId ? res.data : spot
      );
    } catch (error) {
      console.log("here", error);
    }
  };

  deleteSpot = async (spotId) => {
    try {
      await instance.delete(`/spot/delete/${spotId}`);
      this.spots = this.spots.filter((spot) => spot._id !== spotId);
      // authStore.organizer.spots = authStore.organizer.spots.map((spot) => spot._id !== spotId);
      authStore.removeSpot(spotId);
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
