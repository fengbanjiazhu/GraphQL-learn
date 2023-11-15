const Event = require("../../models/event");

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

  singleEvent: async (args) => {
    const { eventID } = args;
    try {
      const event = await Event.findById(eventID);
      return event;
    } catch (error) {
      return error;
    }
  },

  // mutation
  createEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("You are not logged in, please login first");
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
      return error;
    }
  },
};
