import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import emailjs from "emailjs-com";
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
      const response = await instance.post("/organizer/updateToken");
      this.setOrganizer(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  register = async (application) => {
    const newOrganizer = {
      email: application.email,
      phone: application.phone,
      bio: application.bio,
      password: new Array(12)
        .fill()
        .map(() => String.fromCharCode(Math.random() * 86 + 40))
        .join(""),
    };
    try {
      await instance.post("/organizer/register", newOrganizer);
    } catch (error) {
      console.log(error);
    }
  };

  login = async (organizerData) => {
    try {
      const response = await instance.post("/organizer/login", organizerData);
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
      const res = await instance.put("/organizer/update", formData);
      //for (const key in this.organizer) this.organizer[key] = res.data[key];
      this.setOrganizer(res.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrganizers = async () => {
    try {
      const response = await instance.get("/organizer");
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

  changeOrganizer = async (organizerChange) => {
    try {
      await instance
        .put(`/organizer/change`, organizerChange)
        .then((response) => {
          if (response?.data?.isChanged === true) {
            swal({
              type: "success",
              text: "Password Changed 👍",
              icon: "success",
            });
          } else {
            alert("Passwords Don't Match");
          }
        });
    } catch (error) {
      console.log("change", error);
    }
  };

  forgotOrganizer = async (organizerForgot) => {
    // userForgot.username = userForgot.username.toLowerCase();
    try {
      await instance.put(`/organizer/forgot`, organizerForgot).then(
        swal({
          type: "success",
          text: "Email Sent 👍",
          icon: "success",
        })
      );
    } catch (error) {
      console.log("forgot", error);
    }
  };

  addDestsToOrganizer = async (newDests) => {
    try {
      await instance.post("/organizer/more", newDests);
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
      const res = await instance.put("/organizer/update", newOrganizer);
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
