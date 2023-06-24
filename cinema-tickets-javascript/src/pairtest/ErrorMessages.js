import { MAX_TICKETS } from "./TicketService-Constants.js";

const ErrorMessage = {
  INVALID_ACCOUNT_ID: "Invalid accountId, must be a number and greater than 0",
  INVALID_TICKET_TYPE_REQUEST:
    "All ticket type requests must be valid instances of TicketTypeRequest",
  EXCEEDED_MAX_TICKETS: `Exceeded the maximum number of tickets allowed. Maximum tickets: ${MAX_TICKETS}`,
  ADULT_REQUIRED:
    "At least one adult ticket is required when infants are present",
  ONE_INFANT_PER_ADULT: "Only one infant ticket is allowed per adult ticket",
};

export default ErrorMessage;
