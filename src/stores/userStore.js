import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  users = [];

  fetchUsers = async () => {
    try {
      const response = await instance.get(process.env.REACT_APP_USER);
      this.users = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getUserById = (userId) => {
    return this.users.find((user) => user._id === userId);
  };
}

const userStore = new UserStore();
userStore.fetchUsers();
export default userStore;
