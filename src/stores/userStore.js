import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  users = [];

  fetchUsers = async () => {
    try {
        const response = await instance.get("/user/emails");
        this.users = response.data;
        console.log('users', this.users)
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
