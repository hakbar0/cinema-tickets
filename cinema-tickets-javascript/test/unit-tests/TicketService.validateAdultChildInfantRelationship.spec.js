import TicketService from "../../src/pairtest/TicketService";
import InvalidPurchaseException from "../../src/pairtest/lib/InvalidPurchaseException";
import ErrorMessage from "../../src/pairtest/ErrorMessages";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";

describe("TicketService.validateAdultChildInfantRelationship", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  it("should throw InvalidPurchaseException when infants are present but no adults", () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("INFANT", 1),
      new TicketTypeRequest("CHILD", 1),
    ];

    expect(() =>
      ticketService.validateAdultChildInfantRelationship(ticketTypeRequests)
    ).toThrow(new InvalidPurchaseException(ErrorMessage.ADULT_REQUIRED));
  });

  it("should throw InvalidPurchaseException when infants exceed the number of adults", () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 1),
      new TicketTypeRequest("INFANT", 2),
    ];

    expect(() =>
      ticketService.validateAdultChildInfantRelationship(ticketTypeRequests)
    ).toThrow(new InvalidPurchaseException(ErrorMessage.ONE_INFANT_PER_ADULT));
  });

  it("should throw InvalidPurchaseException when children are present but no adults", () => {
    const ticketTypeRequests = [new TicketTypeRequest("CHILD", 1)];

    expect(() =>
      ticketService.validateAdultChildInfantRelationship(ticketTypeRequests)
    ).toThrow(new InvalidPurchaseException(ErrorMessage.ADULT_REQUIRED));
  });

  it("should not throw InvalidPurchaseException when infants and adults have a one-to-one relationship", () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 2),
      new TicketTypeRequest("INFANT", 2),
    ];

    expect(() =>
      ticketService.validateAdultChildInfantRelationship(ticketTypeRequests)
    ).not.toThrow();
  });

  it("should not throw InvalidPurchaseException when there are only adults and no infants or children", () => {
    const ticketTypeRequests = [new TicketTypeRequest("ADULT", 3)];

    expect(() =>
      ticketService.validateAdultChildInfantRelationship(ticketTypeRequests)
    ).not.toThrow();
  });
});
