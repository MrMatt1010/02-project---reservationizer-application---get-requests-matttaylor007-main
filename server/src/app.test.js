const request = require("supertest");
const app = require("./app");

describe("App", () => {
  it("Should GET /reservations", async () => {
    // Arrange
    const expectedStatus = 200;
    const expectedBody = [
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
    //     // Act
    const response = await request(app).get("/reservations");
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  it("Should GET /reservations/:id", async () => {
    // Arrange
    const expectedStatus = 200;
    const expectedBody = {
      id: "614abf0a93e8e80ace792ac6",
      partySize: 2,
      date: "2023-12-03T07:00:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Green Curry",
    };

    //     // Act
    const response = await request(app).get(
      "/reservations/614abf0a93e8e80ace792ac6"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });

  it("Should GET /reservations/:id", async () => {
    // Arrange
    const expectedStatus = 400;
    const expectedBody = {
      message: "id provided is invalid",
    };

    //     // Act
    const response = await request(app).get("/reservations/614abf0a93e8e80a");
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });
  it("Should GET /reservations/:id", async () => {
    // Arrange
    const expectedStatus = 404;
    const expectedBody = {
      message: "id not found",
    };

    //     // Act
    const response = await request(app).get(
      "/reservations/614abf0a93e8e80ace792ac5"
    );
    //     // Assert
    expect(response.status).toBe(expectedStatus);
    expect(response.body).toEqual(expectedBody);
  });
});
