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

  register = async (application) => {
    console.log('application: ', application)
    const newOrganizer ={
      username: application.username,
      email: application.email,
      phone: application.phone,
      bio: application.bio,
      password: new Array(12).fill().map(() => String.fromCharCode(Math.random()*86+40)).join("")
    }
    console.log('newOrganizer: ', newOrganizer)
    try {
      await instance.post("/organizer/register", newOrganizer);
      // this.setOrganizer(response.data.token);
      this.sendWelcomeEmail();
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
      alert("Wrong credintials");
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
      for (const key in this.organizer) this.organizer[key] = res.data[key];
    } catch (error) {
      console.log(error);
    }
  };

  sendWelcomeEmail = () => {
    const emailContent = {
      to_name: this.organizer.username,
      message: "Go Entertain the Masses",
      to_email: this.organizer.email,
    };
    emailjs.init("0CGPMjHzm16JAhRPl");

    emailjs.send("AB-Serv-12", "CG1", emailContent);
  };

  fetchOrganizers = async () => {
    try {
      const response = await instance.get("/organizer");
      console.log('organizers: ', response.data)
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
      await instance.put(`/organizer/change`, organizerChange).then((response) => {
        if (response?.data?.isChanged === true) {
          swal({
            type: "success",
            text: "Password Changed 👍",
            icon: "success"
          });
        } else {
          alert("Passwords Don't Match")
        }
      });
    } catch (error) {
      console.log("change", error);
    }
  };

  forgotOrganizer = async (organizerForgot) => {
    // userForgot.username = userForgot.username.toLowerCase();
    try {
      console.log("organizerForgot", organizerForgot);
      await instance.put(`/organizer/forgot`, organizerForgot).then(swal({
        type: "success",
        text: "Email Sent 👍",
        icon: "success"
      }));
    } catch (error) {
      console.log("forgot", error);
    }
  };
}

const authStore = new AuthStore();
authStore.checkForToken();
authStore.fetchOrganizers();
export default authStore;
