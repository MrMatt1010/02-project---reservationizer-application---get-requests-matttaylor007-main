describe("API server", () => {
  it("GET /reservations returns correct response", () => {
    const expected = [
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

    cy.request("http://localhost:5001/reservations").should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(expected);
    });
  });

  it("GET /reservations/:id returns correct response", () => {
    const expected = {
      id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Island Grill",
    };

    cy.request(
      "http://localhost:5001/reservations/507f1f77bcf86cd799439011"
    ).should((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.deep.equal(expected);
    });
  });

  it("GET /reservations/:id returns 400 if invalid id is provided", () => {
    cy.request({
      url: "http://localhost:5001/reservations/bad-id-format",
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it("GET /reservations/:id returns 404 if id cannot be found", () => {
    cy.request({
      url: "http://localhost:5001/reservations/507f1f77bcf86cd799439017",
      failOnStatusCode: false,
    }).should((response) => {
      expect(response.status).to.eq(404);
    });
  });
});
