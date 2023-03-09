import { makeAutoObservable, toJS } from "mobx";
import swal from "sweetalert";
import { instance } from "./instance";

class ForgetOrganizerStore {
  constructor() {
    makeAutoObservable(this);
  }

  forgetOrganizers = [];

  fetchForgetOrganizers = async () => {
    try {
      const response = await instance.get("/forgetOrganizer");
      this.forgetOrganizers = toJS(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  createForgetOrganizers = async (email) => {
    console.log("email", email)
    try {
      const response = await instance.post(`/forgetOrganizer/create/${email}`,).then(
        swal({
          type: "success",
          text: "Email Sent 👍",
          icon: "success",
        })
      );;
      this.forgetOrganizers.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteForgetOrganizer = async (forgetOrganizerId) => {
    try {
      await instance.delete(`/forgetOrganizer/remove/${forgetOrganizerId}`);
      this.forgetOrganizers = this.forgetOrganizers.filter((forgetOrganizer) => forgetOrganizer._id !== forgetOrganizerId);
    } catch (error) {
      console.log(error);
    }
  };

  getForgetOrganizersById = (forgetOrganizerId) => {
    return this.forgetOrganizers.find((forgetOrganizer) => forgetOrganizer._id === forgetOrganizerId);
  };

  getForgetOrganizers = () => {
    return this.forgetOrganizers;
  };
}

const forgetOrganizerStore = new ForgetOrganizerStore();
forgetOrganizerStore.fetchForgetOrganizers();
export default forgetOrganizerStore;
