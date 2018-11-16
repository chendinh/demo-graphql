const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("Company", new Schema({
  companyName: String,
  location: String,
  numberOfStaff: Number,
  establishYear: Number,
  status: { type: String, default: "Working" }
}));