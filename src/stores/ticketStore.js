import { makeAutoObservable } from "mobx";
import { instance } from "./instance";

class TicketStore {
  constructor() {
    makeAutoObservable(this);
  }

  tickets = [];

  fetchTickets = async () => {
    try {
        const response = await instance.get(process.env.REACT_APP_TICKET);
        this.tickets = response.data;
    } catch (error) {
      console.log(error);
    }
  };

  getTicketById = (ticketId) => {
    return this.tickets.find((ticket) => ticket._id === ticketId);
  };

  getTickets = () => {
    return this.tickets;
  };

}

const ticketStore = new TicketStore();
ticketStore.fetchTickets();
export default ticketStore;
