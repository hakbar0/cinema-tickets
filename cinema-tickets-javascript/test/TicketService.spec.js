import TicketService from "../src/pairtest/TicketService.js";

describe("TicketService", () => {
  test("Should have correct default values for Prices", () => {
    expect(PRICES).toHaveProperty("ADULT", 20);
    expect(PRICES).toHaveProperty("CHILD", 10);
    expect(PRICES).toHaveProperty("INFANT", 0);
  });
});
