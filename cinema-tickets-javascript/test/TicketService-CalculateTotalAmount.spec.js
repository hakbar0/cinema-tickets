import TicketService from "../src/pairtest/TicketService.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";
import { PRICES } from "../src/pairtest/TicketService-Constants.js";

describe("TicketService", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  describe("calculateTotalAmount", () => {
    it("should calculate the correct total amount to be paid for given ticket type requests", () => {
      const ticketTypeRequests = [
        new TicketTypeRequest("ADULT", 2),
        new TicketTypeRequest("CHILD", 3),
        new TicketTypeRequest("CHILD", 1),
        new TicketTypeRequest("INFANT", 1),
        new TicketTypeRequest("INFANT", 1),
      ];

      const totalAmount =
        ticketService.calculateTotalAmount(ticketTypeRequests);

      const expectedAmount =
        PRICES.ADULT * 2 + PRICES.CHILD * 4 + PRICES.INFANT * 2;

      expect(totalAmount).toBe(expectedAmount);
    });

    it("should return 0 if there are no ticket type requests", () => {
      const ticketTypeRequests = [];

      const totalAmount =
        ticketService.calculateTotalAmount(ticketTypeRequests);

      expect(totalAmount).toBe(0);
    });

    it("should exclude the price of infant tickets from the total amount", () => {
      const ticketTypeRequests = [
        new TicketTypeRequest("ADULT", 2),
        new TicketTypeRequest("CHILD", 3),
        new TicketTypeRequest("INFANT", 1),
      ];

      const totalAmount =
        ticketService.calculateTotalAmount(ticketTypeRequests);

      const expectedAmount = PRICES.ADULT * 2 + PRICES.CHILD * 3;

      expect(totalAmount).toBe(expectedAmount);
    });
  });
});
