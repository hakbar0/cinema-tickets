import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService";
import { MAX_TICKETS, PRICES } from "./TicketService-Constants.js";
import ErrorMessage from "./ErrorMessages.js";

export default class TicketService {
  constructor() {
    this.paymentService = new TicketPaymentService();
    this.reservationService = new SeatReservationService();
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    this.validateAccountId(accountId);
    this.validateTicketTypeRequests(ticketTypeRequests);
    this.validateTicketTypeRequests(ticketTypeRequests);
    this.validateAdultChildInfantRelationship(ticketTypeRequests);
  }

  validateAccountId(accountId) {
    if (!Number.isInteger(accountId) || accountId <= 0) {
      throw new InvalidPurchaseException(ErrorMessage.INVALID_ACCOUNT_ID);
    }
  }

  validateTicketTypeRequests(ticketTypeRequests) {
    const isAnyRequestInvalid = ticketTypeRequests.some(
      (request) => !(request instanceof TicketTypeRequest)
    );

    if (ticketTypeRequests.length === 0 || isAnyRequestInvalid) {
      throw new InvalidPurchaseException(
        ErrorMessage.INVALID_TICKET_TYPE_REQUEST
      );
    }
  }

  validateMaximumTicketPurchases(ticketTypeRequests) {
    const totalTickets = ticketTypeRequests.reduce(
      (total, request) => total + request.getNoOfTickets(),
      0
    );

    if (totalTickets > MAX_TICKETS) {
      throw new InvalidPurchaseException(ErrorMessage.EXCEEDED_MAX_TICKETS);
    }
  }

  validateAdultChildInfantRelationship(ticketTypeRequests) {
    const adultsCount = ticketTypeRequests.reduce(
      (total, request) =>
        request.getTicketType() === "ADULT"
          ? total + request.getNoOfTickets()
          : total,
      0
    );

    if (adultsCount === 0) {
      throw new InvalidPurchaseException(ErrorMessage.ADULT_REQUIRED);
    }

    const infantsCount = ticketTypeRequests.reduce(
      (total, request) =>
        request.getTicketType() === "INFANT"
          ? total + request.getNoOfTickets()
          : total,
      0
    );

    if (adultsCount > 0 && infantsCount > adultsCount) {
      throw new InvalidPurchaseException(ErrorMessage.ONE_INFANT_PER_ADULT);
    }
  }
}
