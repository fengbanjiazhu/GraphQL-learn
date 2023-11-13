const User = require("../../models/user");

module.exports = {
  // query
  user: async (args) => {
    try {
      const { userID } = args;
      const user = await User.findById(userID);
      return user;
    } catch (error) {
      return error;
    }
  },

  // mutation

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
