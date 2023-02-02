import { makeAutoObservable, toJS } from "mobx";
import { instance } from "./instance";

class PushNotificationStore {
  constructor() {
    makeAutoObservable(this);
  }

  pushNotifications = [];

  fetchPushNotifications = async () => {
    try {
      const response = await instance.get("/pushNotification");
      this.pushNotifications = toJS(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  createPushNotification = async (newPushNotification) => {
    try {
      const response = await instance.post(`/pushNotification/create`, newPushNotification);
      this.pushNotifications.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deletePushNotification = async (pushNotificationId) => {
    try {
      await instance.delete(`/pushNotification/delete/${pushNotificationId}`);
      this.pushNotifications = this.applications.filter((pushNotification) => pushNotification._id !== pushNotificationId);
    } catch (error) {
      console.log(error);
    }
  };

  getPushNotificationById = (pushNotificationId) => {
    return this.pushNotifications.find((pushNotification) => pushNotification._id === pushNotificationId);
  };

  getPushNotifications = () => {
    return this.pushNotifications;
  };
}

const pushNotificationStore = new PushNotificationStore();
pushNotificationStore.fetchPushNotifications();
export default pushNotificationStore;
