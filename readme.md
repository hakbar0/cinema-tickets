# Cinema Tickets JavaScript Project

## Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. cd ./cinema-tickets.javascript
4. Install the necessary dependencies using `npm install`.
5. Run the tests using `npm test`.

## Tests

This project contains comprehensive unit tests that ensure the `TicketService` class meets all business rules and constraints. To run the tests, use the `npm test` command.

## Built With

- JavaScript
- Node.js
- Jest (for testing)

## More info

This is a JavaScript project that involves implementing a ticket service for a cinema. This service calculates ticket prices, processes payments, and handles seat reservations, adhering to specific business rules and constraints.

## Objective

The main aim of the project is to showcase clean, reusable, and thoroughly tested code while meeting the provided business rules and constraints.

## Business Rules

The business rules to follow are:

- There are three types of tickets: Infant, Child, and Adult.
- Ticket prices are different based on the type of ticket:
  - Infant: £0
  - Child: £10
  - Adult: £20
- The ticket purchaser specifies the quantity and type of tickets they wish to purchase.
- Multiple tickets can be bought at once, but a maximum of 20 tickets can be purchased at a time.
- Infants do not require a ticket and do not have a seat allocated. They sit on an Adult's lap.
- Child and Infant tickets cannot be purchased without purchasing an Adult ticket.
- Payments are processed by the existing `TicketPaymentService`.
- Seat reservations are handled by the existing `SeatReservationService`.

## Constraints

- The TicketService interface CANNOT be modified. (For Java solution only)
- The code in the `thirdparty.*` packages CANNOT be modified.
- The `TicketTypeRequest` SHOULD be an immutable object.

## Assumptions

The following assumptions are made in this project:

- All accounts with an ID greater than zero are valid and have sufficient funds for ticket purchases.
- The `TicketPaymentService` is an external provider with no defects, and the payment will always go through once a payment request has been made.
- The `SeatReservationService` is an external provider with no defects, and the seat will always be reserved once a reservation request has been made.

## Task

The main task of this project is to provide a working implementation of a `TicketService` that:

- Follows the above objective, business rules, constraints, and assumptions.
- Correctly calculates the amount for the requested tickets and makes a payment request to the `TicketPaymentService`.
- Accurately calculates the number of seats to reserve and makes a seat reservation request to the `SeatReservationService`.
- Rejects any invalid ticket purchase requests.

## Project Structure

- `src`: Contains the source code files.
- `lib`: Contains the implementation of the `TicketService` class and supporting files.
- `thirdparty`: Contains the third-party service implementations.
- `test`: Contains the unit tests for the `TicketService` class.
