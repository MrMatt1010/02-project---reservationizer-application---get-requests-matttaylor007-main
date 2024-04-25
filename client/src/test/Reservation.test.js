import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { formatDate } from "../utils/formatDate";
import { Router } from "react-router-dom";
import timezoneMock from "timezone-mock";
import App from "../App";

const reservation = {
  id: "507f1f77bcf86cd799439011",
  partySize: 4,
  date: "2023-11-17T06:30:00.000Z",
  userId: "614abe145f317b89a2e36883",
  restaurantName: "Island Grill",
};

beforeAll(() => {
  jest.spyOn(window, "fetch");
  timezoneMock.register("UTC");
});
// this test is for single reservations
test("displays a reservation", async () => {
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => reservation,
  });
  const history = createMemoryHistory();
  history.push(`/reservations/${reservation.id}`);

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  expect(window.fetch).toHaveBeenCalledWith(
    `http://localhost:5001/reservations/${reservation.id}`
  );

  const restaurantNameEl = await screen.findByText(reservation.restaurantName);
  expect(restaurantNameEl).toBeInTheDocument();
  const dateEl = await screen.findByText(formatDate(reservation.date));
  expect(dateEl).toBeInTheDocument();
  const partySizeEl = await screen.findByText(reservation.partySize);
  expect(partySizeEl).toBeInTheDocument();
});
