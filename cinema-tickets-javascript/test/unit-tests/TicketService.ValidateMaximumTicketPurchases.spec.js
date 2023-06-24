import TicketService from "../../src/pairtest/TicketService.js";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException.js";
import ErrorMessage from "../../src/pairtest/ErrorMessages.js";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest.js";

describe("TicketService.validateMaximumTicketPurchases", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  it("should throw InvalidPurchaseException when total tickets exceed the maximum limit", () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 15),
      new TicketTypeRequest("CHILD", 10),
    ];

    expect(() =>
      ticketService.validateMaximumTicketPurchases(ticketTypeRequests)
    ).toThrow(new InvalidPurchaseException(ErrorMessage.EXCEEDED_MAX_TICKETS));
  });

  it("should not throw InvalidPurchaseException when total tickets are within the maximum limit", () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 5),
      new TicketTypeRequest("CHILD", 10),
    ];

    expect(() =>
      ticketService.validateMaximumTicketPurchases(ticketTypeRequests)
    ).not.toThrow();
  });

  it("should not throw InvalidPurchaseException when total tickets are equal to the maximum limit", () => {
    const ticketTypeRequests = [new TicketTypeRequest("ADULT", 20)];

    expect(() =>
      ticketService.validateMaximumTicketPurchases(ticketTypeRequests)
    ).not.toThrow();
  });

  it("should not throw InvalidPurchaseException when total tickets are less than the maximum limit", () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 10),
      new TicketTypeRequest("CHILD", 5),
    ];

    expect(() =>
      ticketService.validateMaximumTicketPurchases(ticketTypeRequests)
    ).not.toThrow();
  });
});
