const mongoose = require("mongoose");
const reservations = require("../../data/reservations.json");
const ReservationModel = require("../src/models/ReservationModel");
const _ = require("lodash");

const seedData = async () => {
  // mongoose does not support the "$oid" syntax in the JSON
  // so replace it with a mongoose ObjectId
  const formattedReservations = reservations.map((reservation) => {
    return {
      ...reservation,
      _id: new mongoose.Types.ObjectId(reservation._id.$oid),
      date: reservation.date.$date,
    };
  });

  if (!ReservationModel || !_.isEmpty(ReservationModel)) {
    await ReservationModel.collection.insertMany(formattedReservations);
  }
};

module.exports = { seedData };
