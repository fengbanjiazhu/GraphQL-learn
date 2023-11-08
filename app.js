const express = require("express");
const dotenv = require("dotenv");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");

const Event = require("./models/event");

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
      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
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
        const { title, description, price, date } = args.eventInput;
        try {
          const newEvent = await Event.create({
            title,
            description,
            price,
            date: new Date(date),
          });

          return newEvent;
        } catch (error) {
          console.log(error);
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
