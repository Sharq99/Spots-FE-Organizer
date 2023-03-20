import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class OfferStore {
  constructor() {
    makeAutoObservable(this);
  }

  offers = [];

  fetchOffers = async () => {
    try {
      const response = await instance.get(process.env.REACT_APP_OFFER);
      this.offers = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  createOffer = async (newOffer, spotId, file) => {
    try {
      newOffer.image = file;
      const formData = new FormData();
      for (const key in newOffer) formData.append(key, newOffer[key]);
      const response = await instance.post(process.env.REACT_APP_OFFER+'/'+spotId, formData);
      this.offers.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteOffer = async (offerId) => {
    try {
      await instance.delete(process.env.REACT_APP_OFFER_REMOVE+'/'+offerId);
      this.offers = this.offers.filter((offer) => offer._id !== offerId);
    } catch (error) {
      console.log(error);
    }
  };

  getOfferById = (offerId) => {
    return this.offers.find((offer) => offer._id === offerId);
  };

  getOffers = () => {
    return this.offers;
  };
}

const offerStore = new OfferStore();
offerStore.fetchOffers();
export default offerStore;
