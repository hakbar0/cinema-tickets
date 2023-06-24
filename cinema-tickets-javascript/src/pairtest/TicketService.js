import TicketTypeRequest from "./lib/TicketTypeRequest";
import InvalidPurchaseException from "./lib/InvalidPurchaseException";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService";
import { MAX_TICKETS, PRICES } from "./TicketService-Constants";
import ErrorMessage from "./ErrorMessages";
import logger from "../Logger"; // import your logger

export default class TicketService {
  constructor() {
    logger.info("TicketService constructor");
    this.paymentService = new TicketPaymentService();
    this.reservationService = new SeatReservationService();
    this.totalSeatsToAllocate = 0;
    this.totalAmountToPay = 0;
  }

  purchaseTickets(accountId, ...ticketTypeRequests) {
    logger.info("Starting ticket purchase process");
    this.validateAccountId(accountId);
    this.validateTicketTypeRequests(ticketTypeRequests);
    this.validateMaximumTicketPurchases(ticketTypeRequests);
    this.validateAdultChildInfantRelationship(ticketTypeRequests);
    this.totalSeatsToAllocate = this.calculateTotalSeats(ticketTypeRequests);
    this.totalAmountToPay = this.calculateTotalAmount(ticketTypeRequests);

    logger.info(`Total seats to allocate: ${this.totalSeatsToAllocate}`);
    logger.info(`Total amount to pay: ${this.totalAmountToPay}`);

    // Make Payments
    try {
      this.paymentService.pay(this.totalAmountToPay);
      logger.info(`Payment of $${this.totalAmountToPay} was successful.`);
    } catch (error) {
      logger.error(
        `Failed to process payment of $${this.totalAmountToPay}. Error details: ${error.message}`,
        error
      );
      throw new InvalidPurchaseException(
        ErrorMessage.PAYMENT_FAILED(this.totalAmountToPay)
      );
    }

    // Reserve Seats
    try {
      this.reservationService.reserveSeats(this.totalSeatsToAllocate);
      logger.info(
        `Reservation of ${this.totalSeatsToAllocate} seats was successful.`
      );
    } catch (error) {
      logger.error(
        `Failed to reserve ${this.totalSeatsToAllocate} seats. Error details: ${error.message}`,
        error
      );
      throw new InvalidPurchaseException(
        ErrorMessage.RESERVATION_FAILED(this.totalSeatsToAllocate)
      );
    }

    logger.info(
      `Successfully processed payment and reserved seats for the transaction.`
    );
  }

  validateAccountId(accountId) {
    logger.info("Validating account ID");
    if (!Number.isInteger(accountId) || accountId <= 0) {
      logger.error("Invalid account ID");
      throw new InvalidPurchaseException(ErrorMessage.INVALID_ACCOUNT_ID);
    }
  }

  validateTicketTypeRequests(ticketTypeRequests) {
    logger.info("Validating ticket type requests");
    const isAnyRequestInvalid = ticketTypeRequests.some(
      (request) => !(request instanceof TicketTypeRequest)
    );

    if (ticketTypeRequests.length === 0 || isAnyRequestInvalid) {
      logger.error("Invalid ticket type request");
      throw new InvalidPurchaseException(
        ErrorMessage.INVALID_TICKET_TYPE_REQUEST
      );
    }
  }

  validateMaximumTicketPurchases(ticketTypeRequests) {
    logger.info("Validating maximum ticket purchases");
    const totalTickets = ticketTypeRequests.reduce(
      (total, request) => total + request.getNoOfTickets(),
      0
    );

    if (totalTickets > MAX_TICKETS) {
      logger.error("Exceeded maximum ticket purchases");
      throw new InvalidPurchaseException(ErrorMessage.EXCEEDED_MAX_TICKETS);
    }
  }

  validateAdultChildInfantRelationship(ticketTypeRequests) {
    logger.info("Validating adult-child-infant relationship");
    const adultsCount = ticketTypeRequests.reduce(
      (total, request) =>
        request.getTicketType() === "ADULT"
          ? total + request.getNoOfTickets()
          : total,
      0
    );

    if (adultsCount === 0) {
      logger.error("No adult ticket purchased");
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
      logger.error("More infant tickets than adult tickets purchased");
      throw new InvalidPurchaseException(ErrorMessage.ONE_INFANT_PER_ADULT);
    }
  }

  calculateTotalSeats(ticketTypeRequests) {
    logger.info("Calculating total seats");
    let totalSeats = 0;

    for (const request of ticketTypeRequests) {
      if (request.getTicketType() !== "INFANT") {
        totalSeats += request.getNoOfTickets();
      }
    }

    return totalSeats;
  }

  calculateTotalAmount(ticketTypeRequests) {
    logger.info("Calculating total amount");
    const combinedRequests = ticketTypeRequests.reduce((acc, request) => {
      const type = request.getTicketType();
      const count = request.getNoOfTickets();
      acc[type] = (acc[type] || 0) + count;
      return acc;
    }, {});

    return Object.entries(combinedRequests).reduce((total, [type, count]) => {
      const price = PRICES[type];
      return total + price * count;
    }, 0);
  }
}
