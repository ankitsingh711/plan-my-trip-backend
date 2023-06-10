const mongoose = require("mongoose");

const travelSchema = mongoose.Schema({
  name: String,
  email: String,
  destination: String,
  no_of_travellers: Number,
  budget_per_person: Number,
});

const TravelModel = mongoose.model("travels", travelSchema);

module.exports = { TravelModel };
