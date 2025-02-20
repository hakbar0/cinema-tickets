import TicketService from "../../src/pairtest/TicketService";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";
import ErrorMessage from "../../src/pairtest/ErrorMessages";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException";
import { PRICES } from "../../src/pairtest/TicketService-Constants";

describe("TicketService.validateTicketTypeRequests", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  it("should throw an error for an invalid ticket type", () => {
    const invalidRequest = 0;

    expect(() =>
      ticketService.validateTicketTypeRequests([invalidRequest])
    ).toThrow(
      new InvalidPurchaseException(ErrorMessage.INVALID_TICKET_TYPE_REQUEST)
    );
  });

  it("should not throw an error for valid ticket types", () => {
    const validRequest = new TicketTypeRequest("CHILD", PRICES.CHILD);

    expect(() =>
      ticketService.validateTicketTypeRequests([validRequest])
    ).not.toThrow();
  });

  it("should throw an error for mixed valid and invalid ticket types", () => {
    const validRequest = new TicketTypeRequest("ADULT", PRICES.ADULT);
    const invalidRequest = 0;

    expect(() =>
      ticketService.validateTicketTypeRequests([validRequest, invalidRequest])
    ).toThrow(
      new InvalidPurchaseException(ErrorMessage.INVALID_TICKET_TYPE_REQUEST)
    );
  });

  it("should throw an error when wrong price is passed to ticket", () => {
    const inValidRequest = new TicketTypeRequest("ADULT", 500);

    expect(() =>
      ticketService.validateTicketTypeRequests([inValidRequest])
    ).not.toThrow(
      new InvalidPurchaseException(ErrorMessage.INVALID_TICKET_TYPE_REQUEST)
    );
  });

  it("should throw an error for an empty ticket type requests array", () => {
    expect(() => ticketService.validateTicketTypeRequests([])).toThrow(
      new InvalidPurchaseException(ErrorMessage.INVALID_TICKET_TYPE_REQUEST)
    );
  });
});
