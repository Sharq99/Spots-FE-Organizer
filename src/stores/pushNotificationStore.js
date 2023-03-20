import { makeAutoObservable, toJS } from "mobx";
import { instance } from "./instance";

class PushNotificationStore {
  constructor() {
    makeAutoObservable(this);
  }

  pushNotifications = [];

  fetchPushNotifications = async () => {
    try {
      const response = await instance.get(process.env.REACT_APP_NOTIFICATION);
      this.pushNotifications = toJS(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  createPushNotification = async (newPushNotification) => {
    try {
      const response = await instance.post(process.env.REACT_APP_NOTIFICATION_CREATE, newPushNotification);
      this.pushNotifications.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deletePushNotification = async (pushNotificationId) => {
    try {
      await instance.delete(process.env.REACT_APP_NOTIFICATION_REMOVE+'/'+pushNotificationId);
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
