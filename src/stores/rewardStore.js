import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class RewardStore {
  constructor() {
    makeAutoObservable(this);
  }

  rewards = [];

  fetchRewards = async () => {
    try {
      const response = await instance.get("/reward");
      this.rewards = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  createRewards = async (newReward, spotId, file) => {
    try {
      newReward.image = file;
      const formData = new FormData();
      for (const key in newReward) formData.append(key, newReward[key]);
      const response = await instance.post(`/reward/${spotId}`, formData);
      this.rewards.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteReward = async (rewardId) => {
    try {
      await instance.delete(`/reward/delete/${rewardId}`);
      this.rewards = this.rewards.filter((reward) => reward._id !== rewardId);
    } catch (error) {
      console.log(error);
    }
  };

  getRewardById = (rewardId) => {
    return this.rewards.find((reward) => reward._id === rewardId);
  };

  getRewards = () => {
    return this.rewards;
  };
}

const rewardStore = new RewardStore();
rewardStore.fetchRewards();
export default rewardStore;
