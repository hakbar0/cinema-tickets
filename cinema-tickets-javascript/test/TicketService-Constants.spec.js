import { PRICES, MAX_TICKETS } from "../src/pairtest/TicketService-Constants";

describe("Ticket Service PRICES Constant", () => {
  test("Should have correct properties", () => {
    const expectedProperties = ["ADULT", "CHILD", "INFANT"];
    expect(Object.keys(PRICES)).toEqual(
      expect.arrayContaining(expectedProperties)
    );
  });

  test("Should have ADULT property", () => {
    expect(PRICES).toHaveProperty("ADULT");
  });

  test("Should have CHILD property", () => {
    expect(PRICES).toHaveProperty("CHILD");
  });

  test("Should have INFANT property", () => {
    expect(PRICES).toHaveProperty("INFANT");
  });

  test("Should fail for properties in incorrect case", () => {
    const unexpectedProperties = ["adult", "child", "infant"];
    expect(Object.keys(PRICES)).not.toEqual(
      expect.arrayContaining(unexpectedProperties)
    );
  });

  test("Should fail for unexpected properties", () => {
    const unexpectedProperties = ["Lamb", "Cow", "INFANT"];
    expect(Object.keys(PRICES)).not.toEqual(
      expect.arrayContaining(unexpectedProperties)
    );
  });

  test("Should have correct number of properties", () => {
    const expectedProperties = ["ADULT", "CHILD", "INFANT"];
    expect(Object.keys(PRICES)).toHaveLength(expectedProperties.length);
  });

  test("Should fail if has incorrect number of properties", () => {
    const expectedProperties = ["ADULT", "CHILD", "INFANT", "SENIOR"];
    expect(Object.keys(PRICES)).not.toHaveLength(expectedProperties.length);
  });
});

describe("Ticket Service MAX_TICKETS Constant", () => {
  test("Should match a predefined constant value", () => {
    const expectedMaxTickets = 20;
    expect(MAX_TICKETS).toEqual(expectedMaxTickets);
  });
});
