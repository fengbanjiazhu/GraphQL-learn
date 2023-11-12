const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

bookingSchema.post(/^find/, function (docs, next) {
  if (Array.isArray(docs)) {
    docs.forEach((doc) => {
      doc._doc.createdAt = new Date(doc._doc.createdAt).toISOString();
      doc._doc.updatedAt = new Date(doc._doc.updatedAt).toISOString();
    });
  } else {
    docs._doc.createdAt = new Date(docs._doc.createdAt).toISOString();
    docs._doc.updatedAt = new Date(docs._doc.updatedAt).toISOString();
  }

  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
