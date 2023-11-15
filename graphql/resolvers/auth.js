const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const comparePassword = async (typedInPassword, dbSavedPassword) => {
  return await bcrypt.compare(typedInPassword, dbSavedPassword);
};

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

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

  login: async (args) => {
    const { email, password: typedInPassword } = args;
    const currentUser = await User.findOne({ email });
    if (!currentUser) throw new Error("User does not exist");

    const { password: dbSavedPassword, _id: userID } = currentUser;
    const correctPassword = await comparePassword(typedInPassword, dbSavedPassword);
    if (!correctPassword) throw new Error("Wrong password, please try again");

    const token = signToken(userID);

    console.log(token);
    return { token, tokenExpiration: 7 * 24 };
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
