import { makeAutoObservable, toJS } from "mobx";
import { instance } from "./instance";

class ReportStore {
  constructor() {
    makeAutoObservable(this);
  }

  reports = [];

  fetchReports = async () => {
    try {
      const response = await instance.get(process.env.REACT_APP_REPORT);
      this.reports = toJS(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  createReports = async (newReport) => {
    try {
      const response = await instance.post(process.env.REACT_APP_REPORT_CREATE, newReport);
      this.reports.push(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  deleteReport = async (reportId) => {
    try {
      await instance.delete(process.env.REACT_APP_REPORT_REMOVE+'/'+reportId);
      this.reports = this.reports.filter((report) => report._id !== reportId);
    } catch (error) {
      console.log(error);
    }
  };

  getReportsById = (reportId) => {
    return this.reports.find((report) => report._id === reportId);
  };

  getReports = () => {
    return this.reports;
  };
}

const reportStore = new ReportStore();
reportStore.fetchReports();
export default reportStore;
