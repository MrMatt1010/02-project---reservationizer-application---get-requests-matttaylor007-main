import { render, screen } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { formatDate } from "../utils/formatDate";
import { Router } from "react-router-dom";
import timezoneMock from "timezone-mock";
import App from "../App";

const reservations = [
  {
    id: "507f1f77bcf86cd799439011",
    partySize: 4,
    date: "2023-11-17T06:30:00.000Z",
    userId: "614abe145f317b89a2e36883",
    restaurantName: "Island Grill",
  },
  {
    id: "614abf0a93e8e80ace792ac6",
    partySize: 2,
    date: "2023-12-03T07:00:00.000Z",
    userId: "614abe145f317b89a2e36883",
    restaurantName: "Green Curry",
  },
];

beforeAll(() => {
  timezoneMock.register("UTC");
  jest.spyOn(window, "fetch");
});

test("displays a list of reservations", async () => {
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => reservations,
  });
  const history = createMemoryHistory();

  render(
    <Router location={history.location} navigator={history}>
      <App />
    </Router>
  );

  expect(window.fetch).toHaveBeenCalledWith(
    "http://localhost:5001/reservations"
  );

  for (const { restaurantName, date } of reservations) {
    const restaurantNameEl = await screen.findByText(restaurantName);
    expect(restaurantNameEl).toBeInTheDocument();
    const dateEl = await screen.findByText(formatDate(date));
    expect(dateEl).toBeInTheDocument();
  }
});
