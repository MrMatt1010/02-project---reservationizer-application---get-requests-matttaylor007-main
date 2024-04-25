const express = require("express");
const cors = require("cors");
const app = express();
const validId = require("./utils/validId");
const ReservationModel = require("./models/ReservationModel");
const formatReservationId = require("./formatReservationId");

app.use(cors());
app.use(express.json());

app.get("/reservations", async (request, response) => {
  const reservations = await ReservationModel.find({}).lean();
  const formattedId = reservations.map((reservations) => {
    return formatReservationId(reservations);
  });

  response.status(200).send(formattedId);
});

app.get("/reservations/:id", async (request, response) => {
  const id = request.params.id;
  if (!validId(id)) {
    return response.status(400).send({ message: "id provided is invalid" });
  }

  const reservation = await ReservationModel.findById(id).lean();
  // If this is not laid out right the code would try to format an undefined argument.
  if (!reservation) {
    return response.status(404).send({ message: "id not found" });
  }
  // This part of the app is set this way so that the reservation can be formatted.
  const formatReservation = formatReservationId(reservation);
  return response.status(200).send(formatReservation);
});

module.exports = app;
