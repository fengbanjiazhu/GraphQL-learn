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

eventSchema.post(/^find/, function (docs, next) {
  if (Array.isArray(docs)) {
    docs.forEach((doc) => {
      doc._doc.date = new Date(doc._doc.date).toISOString();
    });
  } else {
    docs._doc.date = new Date(docs._doc.date).toISOString();
  }

  next();
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
