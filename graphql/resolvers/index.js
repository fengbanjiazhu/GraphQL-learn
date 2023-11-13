const User = require("../../models/user");
const Event = require("../../models/event");
const Booking = require("../../models/booking");

module.exports = {
  // query
  events: async () => {
    try {
      const allEvents = await Event.find();
      return allEvents;
    } catch (error) {
      return error;
    }
  },
  user: async (args) => {
    try {
      const { userID } = args;
      const user = await User.findById(userID);
      return user;
    } catch (error) {
      return error;
    }
  },
  bookings: async () => {
    try {
      const allBookings = await Booking.find();
      return allBookings;
    } catch (error) {
      return error;
    }
  },

  // mutation
  createEvent: async (args) => {
    const { title, description, price, date } = args.eventInput;
    try {
      const newEvent = await Event.create({
        title,
        description,
        price,
        date: new Date(date),
        creator: "654c7da96697c3aa614d4662",
      });

      await User.findByIdAndUpdate("654c7da96697c3aa614d4662", {
        $push: { createEvents: newEvent._id },
      });

      return newEvent;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  createUser: async (args) => {
    const { email, password } = args.userInput;
    try {
      const newUser = await User.create({
        email,
        password,
      });
      const { _doc } = { ...newUser };

      return { ..._doc, password: null };
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  bookEvent: async (args) => {
    const { eventID } = args;
    const foundEvent = await Event.findById(eventID);
    const booking = await Booking.create({
      user: "654c7da96697c3aa614d4662",
      event: foundEvent,
    });

    return booking;
  },

  cancelBooking: async (args) => {
    try {
      const { bookingID } = args;
      const deletedBooking = await Booking.findByIdAndDelete(bookingID);

      console.log(deletedBooking);

      return { message: "Successful canceled booking" };
    } catch (error) {
      return { message: `There are something went wrong: ${error}` };
    }
  },

  // bookEvent(eventID: ID!): Booking!
  // cancelBooking(bookingID: ID!): Event!
};
