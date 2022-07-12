import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class ReviewStore {
  constructor() {
    makeAutoObservable(this);
  }

  reviews = [];

  fetchReviews = async () => {
    try {
        const response = await instance.get("/review");
        this.reviews = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getReviewById = (reviewId) => {
    return this.reviews.find((review) => review._id === reviewId);
  };

  getReviews = () => {
    return this.reviews;
  };

}

const reviewStore = new ReviewStore();
reviewStore.fetchReviews();
export default reviewStore;
