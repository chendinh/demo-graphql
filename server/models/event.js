const mongoose = require("mongoose");
const Schema = mongoose.Schema;

module.exports = mongoose.model("Event", new Schema({
  eventName: String,
  dateFrom: Date,
  dateEnd: Date,
  address: String,
  description: String,
  companyID: String,
  status: { type: String, default: "Waiting" }
}));