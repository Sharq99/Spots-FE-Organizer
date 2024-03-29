import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import swal from "sweetalert";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  organizer = null;
  organizers = [];

  setOrganizer = (token) => {
    localStorage.setItem("myToken", token);
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    this.organizer = decode(token);
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setOrganizer(token);
      } else {
        this.logout();
      }
    }
  };

  getToken = async () => {
    try {
      const response = await instance.post(process.env.REACT_APP_TOKEN);
      this.setOrganizer(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  register = async (application) => {
    const newOrganizer = {
      email: application.email.toLowerCase(),
      phone: application.phone,
      password: new Array(12)
        .fill()
        .map(() => String.fromCharCode(Math.random() * 86 + 40))
        .join(""),
    };
    try {
      await instance.post(process.env.REACT_APP_REGISTER, newOrganizer);
    } catch (error) {
      console.log(error);
    }
  };

  login = async (organizerData) => {
    organizerData.email = organizerData.email.toLowerCase()
    try {
      const response = await instance.post(process.env.REACT_APP_LOGIN, organizerData);
      this.setOrganizer(response.data.token);
    } catch (error) {
      console.log(error);
      alert("Wrong credintials ");
    }
  };

  logout = () => {
    this.organizer = null;
    localStorage.removeItem("myToken");
    delete instance.defaults.headers.common.Authorization;
  };

  updateOrganizer = async (updatedOrganizer) => {
    try {
      const formData = new FormData();
      for (const key in updatedOrganizer)
        formData.append(key, updatedOrganizer[key]);
      const res = await instance.put(process.env.REACT_APP_UPDATE, formData);
      //for (const key in this.organizer) this.organizer[key] = res.data[key];
      this.setOrganizer(res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrganizers = async () => {
    try {
      const response = await instance.get(process.env.REACT_APP_ORGANIZERS);
      this.organizers = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  //   updateUser = async (updatedUser, userId, recipeId) => {
  //     try {
  //       const res = await instance.put(
  //         `/${userId}/recipes/${recipeId}`,
  //         updatedUser
  //       );
  //     } catch (error) {
  //       console.log("RecipeStore-> updatedRecipe-> error", error);
  //     }
  //   };

  changeOrganizer = async (organizerChange, handleClose, confirmedPassword) => {
    try {
      if(confirmedPassword === organizerChange.newPassword){
        await instance
          .put(process.env.REACT_APP_CHANGE_PASSWORD, organizerChange)
          .then((response) => {
            if (response?.data?.isChanged === true) {
              swal({
                type: "success",
                text: "Password Changed 👍",
                icon: "success",
              });
              handleClose()
            } else {
              swal({
                type: "Please try again!",
                text: "Current password is incorrect",
                icon: "error",
              });
            }
          });
      } else {
        swal({
          type: "Please try again!",
          text: "New password and confirm password don't match",
          icon: "warning",
        });
      }
    } catch (error) {
      console.log("change", error);
    }
  };

  forgotOrganizer = async (email) => {
    try {
      const res = await instance.put(process.env.REACT_APP_FORGOT_PASSWORD+'/'+email.toLowerCase())
      return res.data.message
    } catch (error) {
      console.log("forgot", error);
    }
  };

  addDestsToOrganizer = async (newDests) => {
    newDests.organizerEmail = newDests.organizerEmail.toLowerCase()
    try {
      const res = await instance.put(process.env.REACT_APP_ADD_DEST, newDests);
      console.log('first', res.data.message)
      if(res.data.message === "Dests Added") {
        swal({
            title: res.data.message,
            icon: "success",
            button: "OK",
          })
      } else {
        swal({
          title: res.data.message,
          icon: "error",
          button: "OK",
        })
      }
    } catch (error) {
      console.log(error);
    }
  };

  updateNumofDests = async () => {
    const newOrganizer = {
      ...this.organizer,
      numofDests: this.organizer.numofDests - 1,
    };
    try {
      const res = await instance.put(process.env.REACT_APP_UPDATE, newOrganizer);
      this.setOrganizer(res.data.token);
    } catch (error) {
      console.log("numofdests", error);
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
authStore.fetchOrganizers();
export default authStore;
