import { makeAutoObservable, toJS } from "mobx";
import { instance } from "./instance";

class ApplicationStore {
  constructor() {
    makeAutoObservable(this);
  }

  applications = [];

  fetchApplications = async () => {
    try {
      const response = await instance.get("/application");
      this.applications = toJS(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  createApplications = async (newApplication) => {
    try {
      const response = await instance.post(`/application/create`, newApplication);
      this.applications.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteApplication = async (applicationId) => {
    try {
      await instance.delete(`/application/remove/${applicationId}`);
      this.applications = this.applications.filter((application) => application._id !== applicationId);
    } catch (error) {
      console.log(error);
    }
  };

  getApplicationsById = (applicationId) => {
    return this.applications.find((application) => application._id === applicationId);
  };

  getApplications = () => {
    return this.applications;
  };

  sendRejectionEmail = async (application) => {
    try {
      await instance.post("/application/reject", application);
    } catch (error) {
      console.log(error);
    }
  };
}

const applicationStore = new ApplicationStore();
applicationStore.fetchApplications();
export default applicationStore;
