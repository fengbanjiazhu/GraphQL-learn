const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const Event = require("./models/event");
const User = require("./models/user");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(
  "/graphql",
  graphqlHTTP({
    // routes
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type User {
        _id: ID!
        email: String!
        password: String
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input UserInput {
        email: String!
        password: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    // controller || logic
    rootValue: {
      events: async () => {
        const allEvents = await Event.find();
        return allEvents;
      },
      createEvent: async (args) => {
        console.log(args);
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
    },
    graphiql: true,
  })
);

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    // some options
    dbName: "graphQL",
  })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log("Connection ERROR💥:", err));

app.listen(3000);
