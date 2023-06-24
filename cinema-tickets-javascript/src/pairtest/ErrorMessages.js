import { MAX_TICKETS } from "./TicketService-Constants";

const ErrorMessage = {
  INVALID_ACCOUNT_ID: "Invalid Account ID. It should be a positive number.",
  INVALID_TICKET_TYPE_REQUEST:
    "Invalid Ticket Type Request. All requests should be instances of TicketTypeRequest.",
  EXCEEDED_MAX_TICKETS: `Maximum ticket limit exceeded. You can purchase up to ${MAX_TICKETS} tickets.`,
  ADULT_REQUIRED:
    "At least one adult ticket must be purchased when buying infant tickets.",
  ONE_INFANT_PER_ADULT:
    "One adult ticket must be purchased for each infant ticket.",
  RESERVATION_FAILED: (seats) =>
    `Seat reservation failed. We couldn't reserve ${seats} seats. Please, try again later.`,
  PAYMENT_FAILED: (amount) =>
    `Payment failed. We couldn't process the payment of $${amount}. Please, try again later.`,
};

export default ErrorMessage;
