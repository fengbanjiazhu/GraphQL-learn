const Event = require("../../models/event");
const Booking = require("../../models/booking");

module.exports = {
  // query
  bookings: async () => {
    try {
      const allBookings = await Booking.find();
      return allBookings;
    } catch (error) {
      return error;
    }
  },

  // mutation
  bookEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("You are not logged in, please login first");

    try {
      const { eventID } = args;
      const foundEvent = await Event.findById(eventID);
      const booking = await Booking.create({
        user: "654c7da96697c3aa614d4662",
        event: foundEvent,
      });

      return booking;
    } catch (error) {
      return error;
    }
  },

  cancelBooking: async (args) => {
    try {
      const { bookingID } = args;
      await Booking.findByIdAndDelete(bookingID);

      return { message: "Successful canceled booking" };
    } catch (error) {
      return { message: `There are something went wrong: ${error}` };
    }
  },
};
