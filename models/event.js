const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

eventSchema.pre(/^find/, function (next) {
  this.populate({
    path: "creator",
    select: "-password -createEvents",
  });

  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
