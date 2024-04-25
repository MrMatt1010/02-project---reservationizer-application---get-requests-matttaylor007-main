// FIXME export a model for Reservations
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationsSchema = new Schema({
  partySize: { type: Number, required: true },
  date: { type: Date, default: Date.now, required: true },
  userId: { type: String, required: true },
  restaurantName: { type: String, required: true },
});

const reservations = mongoose.model("reservation", reservationsSchema);

module.exports = reservations;
