const User = require("../../models/user");
const Event = require("../../models/event");

module.exports = {
  events: async () => {
    const allEvents = await Event.find();
    return allEvents;
  },
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
};
