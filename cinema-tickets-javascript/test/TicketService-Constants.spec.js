import { PRICES, MAX_TICKETS } from "../src/pairtest/TicketService-Constants";

describe("Ticket Service Constants", () => {
  test("Should have correct properties for Prices", () => {
    const expectedProperties = ["ADULT", "CHILD", "INFANT"];

    expect(Object.keys(PRICES)).toEqual(
      expect.arrayContaining(expectedProperties)
    );
  });

  test("Should fail for incorrect case properties for prices", () => {
    const unexpectedProperties = ["adult", "child", "infant"];

    expect(Object.keys(PRICES)).not.toEqual(
      expect.arrayContaining(unexpectedProperties)
    );
  });

  test("Should fail for not correct properties for Prices", () => {
    const unexpectedProperties = ["Lamb", "Cow", "INFANT"];

    expect(Object.keys(PRICES)).not.toEqual(
      expect.arrayContaining(unexpectedProperties)
    );
  });

  test("Should have correct number of properties for prices", () => {
    const expectedProperties = ["ADULT", "CHILD", "INFANT"];
    expect(Object.keys(PRICES)).toHaveLength(expectedProperties.length);
  });

  test("Should fail if not correct number of properties for prices", () => {
    const expectedProperties = ["ADULT", "CHILD", "INFANT", "SENIOR"];
    expect(Object.keys(PRICES)).not.toHaveLength(expectedProperties.length);
  });
});
