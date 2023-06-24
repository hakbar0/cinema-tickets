import TicketService from "../../src/pairtest/TicketService";
import TicketTypeRequest from "../../src/pairtest/lib/TicketTypeRequest";

describe("TicketService.calculateTotalSeats", () => {
  let ticketService;

  beforeEach(() => {
    ticketService = new TicketService();
  });

  it("should calculate the correct total number of seats for given ticket type requests", () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 2),
      new TicketTypeRequest("CHILD", 3),
      new TicketTypeRequest("CHILD", 3),
      new TicketTypeRequest("INFANT", 1),
    ];

    const totalSeats = ticketService.calculateTotalSeats(ticketTypeRequests);

    expect(totalSeats).toBe(8); // Expecting 5 seats in total (2 for adults + 3 for children)
  });

  it("should return 0 if there are no ticket type requests", () => {
    const ticketTypeRequests = [];

    const totalSeats = ticketService.calculateTotalSeats(ticketTypeRequests);

    expect(totalSeats).toBe(0); // Expecting 0 seats when there are no ticket type requests
  });

  it("should exclude infant tickets from the total number of seats", () => {
    const ticketTypeRequests = [
      new TicketTypeRequest("ADULT", 2),
      new TicketTypeRequest("CHILD", 3),
      new TicketTypeRequest("INFANT", 1),
    ];

    const totalSeats = ticketService.calculateTotalSeats(ticketTypeRequests);

    expect(totalSeats).not.toBe(6); // Excluding the 1 seat for the infant ticket
    expect(totalSeats).toBe(5);
  });
});
