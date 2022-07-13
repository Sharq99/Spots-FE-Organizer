import { makeAutoObservable } from "mobx";
import { instance } from "./instance";
import decode from "jwt-decode";
import emailjs from 'emailjs-com';

class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }
  organizer = null;

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

  register = async (newOrganizer) => {
    try {
      const response = await instance.post("/organizer/register", newOrganizer);
      this.setOrganizer(response.data.token);
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
      for (const key in updatedOrganizer) formData.append(key, updatedOrganizer[key]);
      const res = await instance.put("/organizer/update", formData);
        if (updatedOrganizer.bio) this.organizer.bio = res.data.bio;
        if (updatedOrganizer.image) this.organizer.image = res.data.image;
        if (updatedOrganizer.phone) this.organizer.phone = res.data.phone;
        if (updatedOrganizer.email) this.organizer.email = res.data.email;
    } catch (error) {
      console.log(error);
    }
  };

  removeSpot = (spotId) => {
    console.log("inside store before: "+this.organizer.spots.length);
    this.organizer.spots = this.organizer.spots.map((spot) => spot !== spotId);
    console.log("inside store after: "+this.organizer.spots.length);
  };

  sendWelcomeEmail = () => {
    const emailContent = {
      to_name: this.organizer.username,
      message: "Go Entertain the Masses",
      to_email: this.organizer.email
  }  
  emailjs.init("0CGPMjHzm16JAhRPl");

  emailjs.send("AB-Serv-12", "CG1", emailContent);
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
}



const authStore = new AuthStore();
authStore.checkForToken();
export default authStore;
