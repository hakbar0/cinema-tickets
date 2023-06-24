import { PRICES } from "../TicketService-Constants";

export default class TicketTypeRequest {
  #type;
  #noOfTickets;

  constructor(type, noOfTickets) {
    if (!PRICES.hasOwnProperty(type.toUpperCase())) {
      throw new TypeError(`type must be ${Object.keys(PRICES).join(", ")}`);
    }

    if (!Number.isInteger(noOfTickets)) {
      throw new TypeError("noOfTickets must be an integer");
    }

    this.#type = type.toUpperCase();
    this.#noOfTickets = noOfTickets;
  }

  getNoOfTickets() {
    return this.#noOfTickets;
  }

  getTicketType() {
    return this.#type;
  }
}
