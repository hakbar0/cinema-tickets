import TicketService from "../../src/pairtest/TicketService";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException";
import ErrorMessage from "../../src/pairtest/ErrorMessages";

describe("TicketService.purchaseTickets", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  it("should throw InvalidPurchaseException when accountId is 0", () => {
    expect(() => ticketService.validateAccountId(0)).toThrow(
      new InvalidPurchaseException(ErrorMessage.INVALID_ACCOUNT_ID)
    );
  });

  it("should throw InvalidPurchaseException when accountId is negative", () => {
    expect(() => ticketService.validateAccountId(-1)).toThrow(
      new InvalidPurchaseException(ErrorMessage.INVALID_ACCOUNT_ID)
    );
  });

  it("should throw InvalidPurchaseException when accountId is a string", () => {
    expect(() => ticketService.validateAccountId("invalid")).toThrow(
      new InvalidPurchaseException(ErrorMessage.INVALID_ACCOUNT_ID)
    );
  });

  it("should not throw InvalidPurchaseException with incorrect error message when accountId is a string", () => {
    const incorrectErrorMessage = "Some incorrect error message";
    expect(() => ticketService.validateAccountId("invalid")).not.toThrow(
      new InvalidPurchaseException(incorrectErrorMessage)
    );
  });
});
